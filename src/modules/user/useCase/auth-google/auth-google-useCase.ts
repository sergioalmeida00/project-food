import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import axios from "axios";
import { AppError } from "../../../../shared/Errors/AppError";
import { GenerateAuth } from "../../../../shared/provider/GenerateAuth";
import { UserAuthGoogle } from "../../DTO/user-dto";

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
        const userInfo:UserAuthGoogle =  userResponse.data

        let user = await this.userRepository.findByEmail(userInfo.email)
        
        if(!user){
            user = await this.userRepository.create({
                name:userInfo.name,
                email:userInfo.email,
                avatar:userInfo.picture,
            })
        }

        const resultUser = GenerateAuth.token({
            email:user.email,
            name:user.name,
            id:user.id!
        })
          return { resultUser }        
      }
}