import { ProductsRepository } from '../../repositories/products/products-repository'

export class GetProductById {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(id: number) {
    const product = await this.productsRepository.findById(id)
    return {
      product,
    }
  }
}
