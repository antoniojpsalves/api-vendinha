import { OrdersRepository } from '../../repositories/orders/orders-repository'
import { ProductsRepository } from '../../repositories/products/products-repository'
import { UsersRepository } from '../../repositories/users/users-repository'
import { RegisterOrderDTO } from './dtos/registerOrderDTO'
import { OutOfStoreError } from './errors/out-of-store-error'
import { ProductDontExistsError } from './errors/product-dont-exists-error'
import { UserDontExistsError } from './errors/user-dont-exists-error'

export class RegisterOrder {
  constructor(
    private ordersRepository: OrdersRepository,
    private productRepository: ProductsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId, productId, quantidade }: RegisterOrderDTO) {
    // Verificar se o usuário existe
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserDontExistsError()
    }

    // Verificar se o produto existe
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new ProductDontExistsError()
    }

    // Verifica se existe estoque o suficiente para fazer a movimentação
    if (product.qntd < quantidade) {
      throw new OutOfStoreError()
    }

    const order = await this.ordersRepository.create({
      user: { connect: { id: userId } }, // Conecta o usuário pelo ID
      produto: { connect: { id: productId } }, // Conecta o produto pelo ID
      quantity: quantidade,
      price: parseFloat(product.preco) * quantidade,
      status: 'ativo',
    })

    // Atualizando a informação de quantidade disponível de um produto após a venda
    await this.productRepository.updateProduct(productId, {
      qntd: product.qntd - quantidade,
    })

    return order
  }
}
