import {  Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './create-user-useCase'
import { AppError } from '../../../../shared/Errors/AppError'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const createUserUseCase = container.resolve(CreateUserUseCase)

    try {
      const resultUser = await createUserUseCase.execute({
        name,
        email,
        password,
      })

      return response.status(201).json({ resultUser })
    } catch (error ) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
   }
  }
}
