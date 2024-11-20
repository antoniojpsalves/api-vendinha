import { Prisma, Produto } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProdutoCreateInput): Promise<Produto>
  findById(id: number): Promise<Produto | null>
  findAllProducts(): Promise<Produto[] | null>
  updateProduct(
    id: number,
    data: Prisma.ProdutoUpdateInput,
  ): Promise<Produto | null>
}
