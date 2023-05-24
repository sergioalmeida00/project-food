import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './create-user-useCase'

export class CreateUserController {
  async handle(request: Request, response: Response, next:NextFunction): Promise<Response> {
    const { name, email, password } = request.body
    const createUserUseCase = container.resolve(CreateUserUseCase)

    try {
      const resultUser = await createUserUseCase.execute({
        name,
        email,
        password,
      })

      return response.status(201).json({ resultUser })
    } catch (error) {
      return next(error)
    }
  }
}
