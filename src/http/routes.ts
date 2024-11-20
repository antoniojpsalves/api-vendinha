import { FastifyInstance } from 'fastify'
import {
  getAllUsers,
  getUserById,
  registerNewUser,
  updateUser,
} from './controllers/user.controller'
import { authenticate } from './controllers/authentication.controller'
import { registerNewProduct } from './controllers/products.controller'

export async function appRoutes(app: FastifyInstance) {
  // Rota de usuários
  app.post('/users', registerNewUser)
  app.get('/users', getAllUsers)
  app.get('/users/:id', getUserById)
  app.put('/users/:id', updateUser)

  app.post('/sessions', authenticate)

  // Rotas de produto
  app.post('/products', registerNewProduct)
}
