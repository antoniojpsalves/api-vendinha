import { hash } from 'bcrypt'

import { RegisterUserDto } from './dtos/registerUserDto'

import { UsersRepository } from '../../repositories/users/users-repository'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'
import { RegisterUseCaseResponse } from './dtos/registerUseCaseResponseDto'

// inversão de dependência para não depender da instancia do prisma nesse momento
export class RegisterUsers {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    cnpj,
    email,
    password,
    isActive,
  }: RegisterUserDto): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameCpfCnpj = await this.usersRepository.findByEmail(email)

    if (userWithSameCpfCnpj) {
      throw new UserEmailAlreadyExistsError()
    }

    // instanciando a classe de repository do userCreate
    // const prismaUserRepository = new PrismaUsersRepository()

    const user = await this.usersRepository.create({
      name,
      cnpj,
      email,
      password: password_hash,
      isActive,
    })

    return {
      user,
    }
  }
}
