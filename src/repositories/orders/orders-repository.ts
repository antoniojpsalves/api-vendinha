import { Prisma, Pedido } from '@prisma/client'

export interface OrdersRepository {
  create(data: Prisma.PedidoCreateInput): Promise<Pedido>
  findOrderById(id: number): Promise<Pedido | null>
  findAllOrders(): Promise<Pedido[] | null>
  updateOrder(
    id: number,
    data: Prisma.PedidoUpdateInput,
  ): Promise<Pedido | null>
}
