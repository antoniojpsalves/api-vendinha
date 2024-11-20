import { ProductsRepository } from '../../repositories/products/products-repository'
import { UpdateProductDto } from './dtos/updateProductDto'

import { ProductDontExistsError } from './errors'

export class UpdateProduct {
  constructor(private productRepository: ProductsRepository) {}

  async execute({ id, name, qntd, preco }: UpdateProductDto) {
    const productExist = await this.productRepository.findById(id)

    if (!productExist) {
      throw new ProductDontExistsError()
    }

    const newData = {
      name,
      qntd,
      preco,
    }

    const product = await this.productRepository.updateProduct(id, newData)

    return {
      product,
    }
  }
}
