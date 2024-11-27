import { OrdersRepository } from '../../repositories/orders/orders-repository'

export class GetOrderById {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(id: number) {
    const order = await this.ordersRepository.findOrderById(id)
    return {
      order,
    }
  }
}
