import { UsersRepository } from '../../repositories/users/users-repository'

export class GetAllUsers {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findAllUsers()

    return {
      users,
    }
  }
}
