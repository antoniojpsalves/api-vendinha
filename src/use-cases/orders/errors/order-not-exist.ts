export class OrderNotExists extends Error {
  constructor() {
    super('Order not exists')
  }
}
