import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserDTO } from "../../DTO/user-dto";
import { AppError } from "../../../../shared/Errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Validation } from "../../../../shared/provider/Validation";

@injectable()
export class AuthUserUseCase{
    constructor(
        @inject('KnexUserRepository')
        private userRepository:IUserRepository
    ){}

    async execute ({email,password}:Pick<UserDTO, 'email'|'password'>){

        const requiredFields ={
            email:'E-mail is required!',
            password:'Password is required!'
        }

        Validation.validateRequiredFields({email,password},requiredFields)

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
            `${process.env.JWT_PASS}`,
            { expiresIn: process.env.JWT_EXPIRE, subject: emailUserExists.id },
        )
        delete emailUserExists.password

        return {token, user:emailUserExists }
    }
}