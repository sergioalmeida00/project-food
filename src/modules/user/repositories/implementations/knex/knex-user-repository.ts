import { knex } from '../../../../../database'
import { UserDTO } from '../../../DTO/user-dto'
import { IUserRepository } from '../../IUserRepository'

export class KnexUserRepository implements IUserRepository {

  async create({ name, email, password }: UserDTO): Promise<UserDTO> {
    const resultUser = await knex('users')
      .insert({
        name,
        email,
        password,
      })
      .returning('*')

    return resultUser[0]
  }

  async findByEmail(email: string): Promise<UserDTO | undefined> {
    const resultEmail = await knex('users').where({email}).first()

    return resultEmail
  }

  async findByIdUser(id: string): Promise<UserDTO> {
    // console.log(id)
    const resultUser = await knex('users').where({ id }).first()

    return resultUser
  }
}
