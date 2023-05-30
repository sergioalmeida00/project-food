import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListByIdRecipeUseCase } from "./listById-recipe-useCase";
import { AppError } from "../../../../shared/Errors/AppError";

export class ListByIdController {
    async handle(request:Request, response:Response):Promise<Response>{
        const listByIdUseCase = container.resolve(ListByIdRecipeUseCase)

        const { id: userId } = request.user
        const {id} = request.params

        try {
            const resultRecipe = await listByIdUseCase.execute({id, user_id:userId})

            return response.status(200).json({resultRecipe})
        } catch (error ) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
              } else {
                return response.status(500).json({ error: "Internal Server Error" });
              }
        }
    }
}