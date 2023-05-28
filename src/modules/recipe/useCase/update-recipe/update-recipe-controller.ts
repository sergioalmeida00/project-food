import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateRecipeUseCase } from "./update-recipe-useCase";
import { AppError } from "../../../../shared/Errors/AppError";

export class UpdateRecipeController{
    async handle(request:Request, response:Response):Promise<Response>{
        const updateRecipeUseCase = container.resolve(UpdateRecipeUseCase)
        const { id } = request.params
        const { id: userId } = request.user
        const filePath = request.file?.filename

        const { 
            title,
            description,
            time,
            category_id,
            difficulty,
        } = request.body

        try {

            await updateRecipeUseCase.execute({
                id,
                title,
                description,
                avatar:filePath,
                time,
                category_id,
                difficulty,
                user_id:userId
            })

            return response.sendStatus(204)
            
        } catch (error ) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
              } else {
                return response.status(500).json({ error: "Internal Server Error" });
              }
        }
    }
}