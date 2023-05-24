import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserDTO } from "../../DTO/user-dto";
import { AppError } from "../../../../shared/Errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

@injectable()
export class AuthUserUseCase{
    constructor(
        @inject('KnexUserRepository')
        private userRepository:IUserRepository
    ){}

    async execute ({email,password}:Pick<UserDTO, 'email'|'password'>){
        const emailUserExists = await this.userRepository.findByEmail(email)

        if(!emailUserExists){
            throw new AppError("Incorrect Login/email",404);            
        }

        const passwordMatch = compare(password,emailUserExists.password)

        if(!passwordMatch) {
            throw new AppError("Incorrect Login/email",404);    
        }

        const token = sign(
            {email: emailUserExists.email, name:emailUserExists.name, id: emailUserExists.id},
            'teste',
            {expiresIn:'1d'}
        )
        delete emailUserExists.password

        return {token, user:emailUserExists }
    }
}