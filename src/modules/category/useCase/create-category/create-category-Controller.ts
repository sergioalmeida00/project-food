import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./create-category-useCase";
import { AppError } from "../../../../shared/Errors/AppError";

export class CreateCategoryController{
    async handle(request:Request, response:Response):Promise<Response>{
        const {name} = request.body
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
        try {
            const resultCategory  = await createCategoryUseCase.execute({name})
            return response.status(201).json({resultCategory})
        } catch (error ) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
              } else {
                return response.status(500).json({ error: "Internal Server Error" });
              }
        }
    }
}