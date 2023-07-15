import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserDTO } from "../../DTO/user-dto";
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/Errors/AppError";
import { Validation } from "../../../../shared/provider/Validation";
import { GenerateAuth } from "../../../../shared/provider/GenerateAuth";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("KnexUserRepository")
    private useRepository: IUserRepository
  ) {}

  async execute({ name, email, password, avatar}: UserDTO): Promise<any> {
    const requiredFields = {
      name: "Name is required!",
      email: "Email is required!",
      password: "Password is required!",
    };

    Validation.validateRequiredFields(
      { name, email, password },
      requiredFields
    );

    const passwordHash = await hash(password!, 8);
    const emailExists = await this.useRepository.findByEmail(email);

        
    if (emailExists && emailExists.password) {
      throw new AppError("e-mail já cadastrado");
    }
    
    if(emailExists && !emailExists.password ){
      throw new AppError("e-mail já associado a uma conta do Google", 404);
    }

    const resultUser = await this.useRepository.create({
      name,
      email,
      password: passwordHash,
      avatar
    });

    const data = GenerateAuth.token({
      email,
      name,
      id:resultUser.id!,
    })    

    return {
      ...data,
      avatar:resultUser.avatar
    };
  }
}
