import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../repositories/IUserRepository'
import { UserDTO } from '../../DTO/user-dto'
import { hash } from 'bcryptjs'
import { AppError } from '../../../../shared/Errors/AppError'
import { Validation } from '../../../../shared/provider/Validation'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('KnexUserRepository')
    private useRepository: IUserRepository,
  ) {}

  async execute({ name, email, password }: UserDTO): Promise<UserDTO> {

    const requiredFields = {
      name: 'Name is required!',
      email:'Email is required!',
      password: 'Password is required!'
    }

    Validation.validateRequiredFields({ name, email, password }, requiredFields)

    const passwordHash = await hash(password, 8)
    const emailExists = await this.useRepository.findByEmail(email)

    if(emailExists){
      throw new AppError("E-mail is exists");      
    }

    const resultUser = await this.useRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return resultUser
  }
}
