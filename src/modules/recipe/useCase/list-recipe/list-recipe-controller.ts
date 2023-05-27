import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRecipeUseCase } from "./list-recipe-useCase";
import { AppError } from "../../../../shared/Errors/AppError";

export class ListRecipeController {
    async handle(request: Request, response:Response):Promise<Response>{
        const listRecipeUseCase = container.resolve(ListRecipeUseCase)

        try {
            const resultRecipe = await listRecipeUseCase.execute()

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