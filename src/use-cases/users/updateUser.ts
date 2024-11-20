import { hash } from 'bcrypt'
import { UsersRepository } from '../../repositories/users/users-repository'
import { UpdateUserDto } from './dtos/updateUserDTO'
import { UserDontExistsError } from './errors/user-dont-exists-error'

export class UpdateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, cnpj, email, name, password, isActive }: UpdateUserDto) {
    const password_hash = await hash(password, 6)

    const userExist = await this.usersRepository.findById(id)

    if (!userExist) {
      throw new UserDontExistsError()
    }

    const newData = {
      name,
      cnpj,
      email,
      password: password_hash,
      isActive,
    }

    const user = await this.usersRepository.updateUser(id, newData)

    return {
      user,
    }
  }
}
