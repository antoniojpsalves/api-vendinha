import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOrdersRepository } from '../../repositories/orders/prisma-orders-repository'
import { RegisterOrder } from '../../use-cases/orders/registerOrder'
import { PrismaProductsRepository } from '../../repositories/products/prisma-products-repository'
import { PrismaUsersRepository } from '../../repositories/users/prisma-users-repository'
import { GetAllOrders } from '../../use-cases/orders/getAllOrders'
import { GetOrderById } from '../../use-cases/orders/getOrderById'
import { OutOfStoreError } from '../../use-cases/orders/errors/out-of-store-error'
import { ProductDontExistsError } from '../../use-cases/orders/errors/product-dont-exists-error'
import { UserDontExistsError } from '../../use-cases/orders/errors/user-dont-exists-error'
import { CancelOrderByID } from '../../use-cases/orders/cancelOrderById'

async function registerNewOrder(request: FastifyRequest, reply: FastifyReply) {
  const registerOrderBodySchema = z.object({
    userId: z.coerce.number(),
    productId: z.coerce.number(),
    quantidade: z.coerce.number(),
  })

  const { userId, productId, quantidade } = registerOrderBodySchema.parse(
    request.body,
  )

  try {
    const prismaOrdersRepository = new PrismaOrdersRepository()
    const prismaProductRepository = new PrismaProductsRepository()
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerOrderUseCase = new RegisterOrder(
      prismaOrdersRepository,
      prismaProductRepository,
      prismaUsersRepository,
    )

    await registerOrderUseCase.execute({
      userId,
      productId,
      quantidade,
    })
  } catch (err) {
    console.error(err)

    if (
      err instanceof OutOfStoreError ||
      err instanceof ProductDontExistsError ||
      err instanceof UserDontExistsError
    ) {
      reply.code(409).send({ message: err.message })
    }

    throw err
  }

  return reply.code(201).send()
}

async function getAllOrders(request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaOrdersRepository = new PrismaOrdersRepository()
    const getAllOrdersUseCase = new GetAllOrders(prismaOrdersRepository)

    const products = await getAllOrdersUseCase.execute()
    return reply.code(200).send(products)
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function getOrderById(request: FastifyRequest, reply: FastifyReply) {
  const getOrderByIdSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = getOrderByIdSchema.parse(request.params)

  try {
    const prismaOrdersRepository = new PrismaOrdersRepository()
    const getAllOrdersUseCase = new GetOrderById(prismaOrdersRepository)

    const data = await getAllOrdersUseCase.execute(id)

    return reply.send(data)
  } catch (error) {
    console.error(error)
  }
}

async function cancelOrderById(request: FastifyRequest, reply: FastifyReply) {
  const getOrderByIdSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = getOrderByIdSchema.parse(request.params)

  try {
    const prismaOrdersRepository = new PrismaOrdersRepository()
    const prismaProductRepository = new PrismaProductsRepository()
    const cancelOrderUseCase = new CancelOrderByID(
      prismaOrdersRepository,
      prismaProductRepository,
    )

    const data = await cancelOrderUseCase.execute(id)

    return reply.send(data)
  } catch (error) {
    console.error(error)
  }
}

export { registerNewOrder, getAllOrders, getOrderById, cancelOrderById }
