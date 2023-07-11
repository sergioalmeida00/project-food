import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import axios from "axios";
import { AppError } from "../../../../shared/Errors/AppError";
import { GenerateAuth } from "../../../../shared/provider/GenerateAuth";

@injectable()
export class AuthGoogleUseCase{
    constructor(
        @inject("KnexUserRepository")
        private userRepository: IUserRepository
      ) {}

      async execute(access_token:string){ 
        const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo',{
            headers:{
                 Authorization: `Bearer ${access_token}`
                }
            });
        const { email } =  userResponse.data

        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new AppError("e-mail não cadastrado", 404);
        }

        const resultUser = GenerateAuth.token({
            email:user.email,
            name:user.name,
            id:user.id!
        })

          return { resultUser }
        
      }
}