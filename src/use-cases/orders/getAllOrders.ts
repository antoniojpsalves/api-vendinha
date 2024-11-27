import { OrdersRepository } from '../../repositories/orders/orders-repository'

export class GetAllOrders {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute() {
    const orders = await this.ordersRepository.findAllOrders()

    return {
      orders,
    }
  }
}
