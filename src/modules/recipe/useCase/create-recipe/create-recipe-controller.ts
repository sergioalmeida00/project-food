import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRecipeUseCase } from "./create-recipe-useCase";
import {DiskStorage} from '../../../../shared/provider/DiskStorage'
import { AppError } from "../../../../shared/Errors/AppError";
export class CreateRecipeController{
    async handle (request:Request, response:Response):Promise<Response>{
        const createRecipeUseCase = container.resolve(CreateRecipeUseCase)

        const { id: userId } = request.user
        // const filePath = request.file?.filename
        const {title,description,time,difficulty,category_id, avatar} = request.body
        try {
            // await new DiskStorage().saveFile(filePath!)
            const validDifficulties =  ["FACIL", "MEDIO", "DIFICIL"];

            if(!validDifficulties.includes(difficulty.toUpperCase())){
                throw new AppError('Difficulty is not an enum',400)
            }
            
            const resultRecipe = await createRecipeUseCase.execute({
                title,
                description,
                avatar,
                time,
                difficulty:difficulty.toUpperCase(),
                category_id,
                user_id:userId
            })
            
            return response.status(201).json({resultRecipe})
        } catch (error ) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
              } else {
                console.log(error)
                return response.status(500).json({ error: "Internal Server Error" });
              }
        }

    }
}