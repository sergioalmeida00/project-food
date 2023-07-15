import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserDTO } from "../../DTO/user-dto";
import { AppError } from "../../../../shared/Errors/AppError";
import { compare } from "bcryptjs";
import { Validation } from "../../../../shared/provider/Validation";
import { GenerateAuth } from "../../../../shared/provider/GenerateAuth";

@injectable()
export class AuthUserUseCase {
  constructor(
    @inject("KnexUserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: Pick<UserDTO, "email" | "password" >) {
    const requiredFields = {
      email: "E-mail is required!",
      password: "Password is required!",
    };

    Validation.validateRequiredFields({ email, password }, requiredFields);

    const emailUserExists = await this.userRepository.findByEmail(email);

    if (!emailUserExists) {
      throw new AppError("e-mail não cadastrado", 404);
    }

    if(!emailUserExists.password){
      throw new AppError("e-mail já associado a uma conta do Google", 404);
    }
    

    const passwordMatch = await compare(password!, emailUserExists.password!);
    
    if (!passwordMatch) {
      throw new AppError("senha incorreta", 404);
    }

    const resultUser = GenerateAuth.token({
      email:emailUserExists.email,
      name:emailUserExists.name,
      id:emailUserExists.id!
    })

    return { 
      ...resultUser,
      avatar:emailUserExists.avatar
    };
  }
}
