import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRecipeUseCase } from "./delete-recipe-useCase";
import { AppError } from "../../../../shared/Errors/AppError";

export class DeleteRecipeController{
    async handle(request:Request, response:Response):Promise<Response>{
        const deleteRecipeUseCase = container.resolve(DeleteRecipeUseCase)
        const { id: userId } = request.user
        const {id} = request.params

        try {
            await deleteRecipeUseCase.execute({
                id,
                user_id:userId
            })

            return response.sendStatus(200)
            
        } catch (error ) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
              } else {
                return response.status(500).json({ error: "Internal Server Error" });
              }
        }

    }
}