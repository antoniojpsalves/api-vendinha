import { ProductsRepository } from '../../repositories/products/products-repository'

export class GetAllProducts {
  constructor(private productsRepository: ProductsRepository) {}

  async execute() {
    const products = await this.productsRepository.findAllProducts()

    return {
      products,
    }
  }
}
