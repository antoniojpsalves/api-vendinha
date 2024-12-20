import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from './users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findById(id: number) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async findAllUsers() {
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    })
    return users
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    const userUpdated = await prisma.user.update({
      where: {
        id,
      },
      data,
    })
    return userUpdated
  }
}
