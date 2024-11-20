import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { PrismaProductsRepository } from '../../repositories/products/prisma-products-repository'
import { RegisterProductUseCase } from '../../use-cases/products/registerProduct'

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

    // const
  } catch (error) {
    console.error(error)
  }

  return reply.code(201).send()
}
