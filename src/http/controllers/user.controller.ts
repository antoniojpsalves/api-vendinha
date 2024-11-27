import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { RegisterUsers } from '../../use-cases/users/registerUser'
import { PrismaUsersRepository } from '../../repositories/users/prisma-users-repository'
import { UserEmailAlreadyExistsError } from '../../use-cases/users/errors/user-email-already-exists-error'

import { GetAllUsers } from '../../use-cases/users/getAllUsers'
import { UpdateUser } from '../../use-cases/users/updateUser'
import { UserDontExistsError } from '../../use-cases/users/errors/user-dont-exists-error'
import { GetUserById } from '../../use-cases/users/getUserById'

async function registerNewUser(request: FastifyRequest, reply: FastifyReply) {
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

async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
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

async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string(),
    cnpj: z.string().min(11),
    email: z.string().email(),
    password: z.string().min(6),
    isActive: z.boolean(),
  })

  const updateUserByIdSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = updateUserByIdSchema.parse(request.params)

  const { name, cnpj, email, password, isActive } = updateBodySchema.parse(
    request.body,
  )

  try {
    // Instanciando a dependência
    const prismaUserRepository = new PrismaUsersRepository()

    // Injetando a dependência
    const registerUseCase = new UpdateUser(prismaUserRepository)

    // Usando o caso de uso
    await registerUseCase.execute({
      id,
      name,
      cnpj,
      email,
      password,
      isActive,
    })
  } catch (err) {
    // console.error(err)

    if (err instanceof UserDontExistsError) {
      reply.code(409).send({ message: err.message })
    }

    throw err
  }

  return reply.code(201).send()
}

async function getUserById(request: FastifyRequest, reply: FastifyReply) {
  const updateUserByIdSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = updateUserByIdSchema.parse(request.params)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const getUserByIdUseCase = new GetUserById(prismaUserRepository)

    const data = await getUserByIdUseCase.execute(id)

    return reply.send(data)
  } catch (error) {
    console.error(error)
  }
}

export { registerNewUser, getAllUsers, updateUser, getUserById }
