import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAllUsers(): Promise<User[] | null>
  updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User | null>
}
