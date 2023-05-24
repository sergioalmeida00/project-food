import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./create-category-useCase";

export class CreateCategoryController{
    async handle(request:Request, response:Response):Promise<Response>{
        const {name} = request.body
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
        try {
            const resultCategory  = await createCategoryUseCase.execute({name})
            return response.status(201).json({resultCategory})
        } catch (error) {
            console.log(error)
            return response.status(404)
        }
    }
}