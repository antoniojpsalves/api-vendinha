import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'
import { ProductsRepository } from './products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Prisma.ProdutoCreateInput) {
    const product = await prisma.produto.create({
      data,
    })
    return product
  }

  async findById(id: number) {
    const product = await prisma.produto.findFirst({
      where: {
        id,
      },
    })

    return product
  }

  async findAllProducts() {
    const products = await prisma.produto.findMany({
      orderBy: {
        id: 'asc',
      },
    })
    return products
  }

  async updateProduct(id: number, data: Prisma.ProdutoUpdateInput) {
    const productUpdated = await prisma.produto.update({
      where: {
        id,
      },
      data,
    })
    return productUpdated
  }
}
