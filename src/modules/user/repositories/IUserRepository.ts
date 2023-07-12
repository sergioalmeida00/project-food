import { UserDTO } from '../DTO/user-dto'

interface IUserRepository {
  create({ name, email, password,avatar }: UserDTO): Promise<UserDTO>
  findByEmail(email:string):Promise<UserDTO | undefined>
  findByIdUser(id:string):Promise<UserDTO>
}

export { IUserRepository }
