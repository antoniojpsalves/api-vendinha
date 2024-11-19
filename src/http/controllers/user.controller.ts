import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { RegisterUsers } from '../../use-cases/users/registerUser'
import { PrismaUsersRepository } from '../../repositories/users/prisma-users-repository'
import { UserEmailAlreadyExistsError } from '../../use-cases/users/errors/user-email-already-exists-error'

import { GetAllUsers } from '../../use-cases/users/getAllUsers'

export async function registerNewUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    cnpj: z.string().min(11),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, cnpj, email, password } = registerBodySchema.parse(request.body)

  const isActive = true

  try {
    // Instanciando a dependência
    const prismaUserRepository = new PrismaUsersRepository()

    // Injetando a dependência
    const registerUseCase = new RegisterUsers(prismaUserRepository)

    // Usando o caso de uso
    await registerUseCase.execute({
      name,
      cnpj,
      email,
      password,
      isActive,
    })
  } catch (err) {
    // console.error(err)

    if (err instanceof UserEmailAlreadyExistsError) {
      reply.code(409).send({ message: err.message })
    }

    throw err
  }

  return reply.code(201).send()
}

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Instanciando a dependência
    const prismaUserRepository = new PrismaUsersRepository()

    // Injetando a dependência
    const getAllUsers = new GetAllUsers(prismaUserRepository)

    // Usando o caso de uso
    const users = await getAllUsers.execute()
    return reply.code(200).send(users)
  } catch (err) {
    console.error(err)
    throw err
  }
}
