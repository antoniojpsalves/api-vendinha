import { prisma } from '../../lib/prisma'
import { Pedido, Prisma } from '@prisma/client'
import { OrdersRepository } from './orders-repository'

export class PrismaOrdersRepository implements OrdersRepository {
  async create(data: Prisma.PedidoCreateInput): Promise<Pedido> {
    const order = await prisma.pedido.create({
      data,
    })

    return order
  }

  async findOrderById(id: number): Promise<Pedido | null> {
    const order = await prisma.pedido.findFirst({
      where: {
        id,
      },
    })
    return order
  }

  async findAllOrders(): Promise<Pedido[] | null> {
    const orders = await prisma.pedido.findMany({
      include: {
        user: true,
        produto: true,
      },
      where: {
        status: {
          contains: 'ativo',
        },
      },
      orderBy: {
        id: 'asc',
      },
    })
    return orders
  }

  async updateOrder(id: number, newStatus: string): Promise<Pedido | null> {
    const oderUpdated = await prisma.pedido.update({
      where: {
        id,
      },
      data: {
        status: newStatus,
      },
    })

    return oderUpdated
  }
}
