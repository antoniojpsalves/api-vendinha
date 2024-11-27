export class OutOfStoreError extends Error {
  constructor() {
    super('Item stock is insufficient')
  }
}
