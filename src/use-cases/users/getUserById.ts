import { UsersRepository } from '../../repositories/users/users-repository'

export class GetUserById {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number) {
    const user = await this.usersRepository.findById(id)
    return {
      user,
    }
  }
}
