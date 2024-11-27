import { OrdersRepository } from '../../repositories/orders/orders-repository'
import { ProductsRepository } from '../../repositories/products/products-repository'
import { OrderNotExists } from './errors/order-not-exist'

export class CancelOrderByID {
  constructor(
    private ordersRepository: OrdersRepository,
    private productRepository: ProductsRepository,
  ) {}

  async execute(id: number) {
    const orderExist = await this.ordersRepository.findOrderById(id)

    if (!orderExist) {
      throw new OrderNotExists()
    }

    const product = await this.ordersRepository.updateOrder(id, 'cancelada')

    const productOnStock = await this.productRepository.findById(
      orderExist.produtoId,
    )

    if (productOnStock) {
      const newData = {
        qntd: orderExist.quantity + productOnStock?.qntd,
      }

      await this.productRepository.updateProduct(productOnStock.id, newData)
    }

    return {
      product,
    }
  }
}
