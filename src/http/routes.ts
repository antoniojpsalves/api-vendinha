import { FastifyInstance } from 'fastify'
import {
  getAllUsers,
  getUserById,
  registerNewUser,
  updateUser,
} from './controllers/user.controller'
import { authenticate } from './controllers/authentication.controller'
import {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
} from './controllers/products.controller'
import {
  getAllOrders,
  getOrderById,
  registerNewOrder,
} from './controllers/orders.controller'

export async function appRoutes(app: FastifyInstance) {
  // Rota de usuários
  app.post('/users', registerNewUser)
  app.get('/users', getAllUsers)
  app.get('/users/:id', getUserById)
  app.put('/users/:id', updateUser)

  app.post('/sessions', authenticate)

  // Rotas de produto
  app.post('/products', registerNewProduct)
  app.get('/products', getAllProducts)
  app.get('/products/:id', getProductById)
  app.put('/products/:id', updateProduct)

  // Rotas de pedidos
  app.post('/orders', registerNewOrder)
  app.get('/orders', getAllOrders)
  app.get('/orders/:id', getOrderById)
}
