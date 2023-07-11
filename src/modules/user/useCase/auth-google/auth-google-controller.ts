import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthGoogleUseCase } from "./auth-google-useCase";
import { AppError } from "../../../../shared/Errors/AppError";

export class AuthGoogleController{
    async handle(request:Request, response:Response):Promise<Response>{
        const { access_token } = request.body

        const authGoogleUseCase = container.resolve(AuthGoogleUseCase)

        try {
            const data = await authGoogleUseCase.execute(access_token);
            return response.status(201).json(data);
          } catch (error) {
            if (error instanceof AppError) {
              return response.status(error.statusCode).json({ error: error.message });
            } else {
              console.log(error);
              return response.status(500).json({ error: "Internal Server Error" });
            }
          }

    }
}