import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { PrismaProductsRepository } from '../../repositories/products/prisma-products-repository'
import { RegisterProductUseCase } from '../../use-cases/products/registerProduct'
import { GetAllProducts } from '../../use-cases/products/getAllProducts'
import { GetProductById } from '../../use-cases/products/getProductByid'

export async function registerNewProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerProductBodySchema = z.object({
    name: z.string(),
    qntd: z.coerce.number(),
    preco: z.string(),
  })

  const { name, qntd, preco } = registerProductBodySchema.parse(request.body)
  try {
    const prismaProductRepository = new PrismaProductsRepository()
    const registerProductUseCase = new RegisterProductUseCase(
      prismaProductRepository,
    )

    await registerProductUseCase.execute({
      name,
      qntd,
      preco,
    })
  } catch (error) {
    console.error(error)
  }

  return reply.code(201).send()
}

export async function getAllProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const prismaProductsRepository = new PrismaProductsRepository()
    const getAllProductsUseCase = new GetAllProducts(prismaProductsRepository)

    const products = await getAllProductsUseCase.execute()
    return reply.code(200).send(products)
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function getProductById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getProductByIdSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = getProductByIdSchema.parse(request.params)

  try {
    const prismaProductsRepository = new PrismaProductsRepository()
    const getProductByIdUseCase = new GetProductById(prismaProductsRepository)

    const data = await getProductByIdUseCase.execute(id)

    return reply.send(data)
  } catch (error) {
    console.error(error)
  }
}
