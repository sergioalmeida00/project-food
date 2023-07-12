import { sign } from "jsonwebtoken";

export class GenerateAuth{
    static token({ email, name, id ,avatar }:{email:string,name:string, id:string, avatar?:string}){
        const token = sign(
            {
                email,
                name,
                id,
                avatar
            },
            `${process.env.JWT_PASS}`,
            {expiresIn:process.env.JWT_EXPIRE, subject:id}
        )

        return {
            id,
            name,
            email,
            token
        }
    }
}