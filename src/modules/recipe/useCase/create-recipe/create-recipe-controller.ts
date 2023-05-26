import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRecipeUseCase } from "./create-recipe-useCase";
import {DiskStorage} from '../../../../shared/provider/DiskStorage'
export class CreateRecipeController{
    async handle (request:Request, response:Response):Promise<Response>{
        const createRecipeUseCase = container.resolve(CreateRecipeUseCase)

        const { id: userId } = request.user
        const filePath = request.file?.filename
        const {title,description,time,difficulty,category_id} = request.body
        try {
            await new DiskStorage().saveFile(filePath!)
            
            const resultRecipe = await createRecipeUseCase.execute({
                title,
                description,
                avatar:filePath,
                time,
                difficulty,
                category_id,
                user_id:userId
            })
            
            return response.status(201).json({resultRecipe})
        } catch (error) {
            console.log(error)
            return response.status(404)
        }

    }
}