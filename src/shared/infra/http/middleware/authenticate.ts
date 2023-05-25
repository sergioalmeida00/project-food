import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../Errors/AppError";
import { verify } from "jsonwebtoken";
import { KnexUserRepository } from "../../../../modules/user/repositories/implementations/knex/knex-user-repository";

interface IPayloadDTO {
    sub: string
  }

export function authenticate(request:Request, response:Response, next:NextFunction){
    const { authorization } = request.headers

    if (!authorization) {
        throw new AppError('JWT Token Missing Error')
    }

    const [, token] = authorization.split(' ')

    try {

        const { sub: userId } = verify(
            token,
            process.env.JWT_PASS ?? '',
          ) as IPayloadDTO
          
        const verifyUserExists = new KnexUserRepository().findByIdUser(userId)

        if (!verifyUserExists) {
            throw new AppError('User does not exist')
        }

        request.user = {
            id: userId,
        }

        next()

    } catch (error) {
        throw new AppError('JWT Token Invalid')
    }
}