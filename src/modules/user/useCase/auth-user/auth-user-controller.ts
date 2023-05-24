import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AuthUserUseCase } from "./auth-user-useCase";

export class AuthUserController{
    async handle(request:Request, response:Response, next:NextFunction):Promise<Response>{
        const {email,password} = request.body
        const authUserUseCase = container.resolve(AuthUserUseCase)

        try {
            const token = await authUserUseCase.execute({email,password})
            return response.status(201).json({token})
        } catch (error) {
           return next(error)
        }
    }
}