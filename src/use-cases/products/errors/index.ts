export class ProductDontExistsError extends Error {
  constructor() {
    super("Product don't exists.")
  }
}
