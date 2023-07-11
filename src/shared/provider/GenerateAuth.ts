import { sign } from "jsonwebtoken";

export class GenerateAuth{
    static token({ email, name, id }:{email:string,name:string, id:string}){
        const token = sign(
            {
                email,
                name,
                id
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