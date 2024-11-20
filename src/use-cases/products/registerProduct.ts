import { PrismaProductsRepository } from '../../repositories/products/prisma-products-repository'
import { RegisterProductDto } from './dtos/registerProductDto'

export class RegisterProductUseCase {
  constructor(private productRepository: PrismaProductsRepository) {}

  async execute({ name, qntd, preco }: RegisterProductDto) {
    const product = this.productRepository.create({ name, qntd, preco })

    return {
      product,
    }
  }
}
