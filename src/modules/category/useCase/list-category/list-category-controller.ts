import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCase } from "./list-category-useCase";
import { AppError } from "../../../../shared/Errors/AppError";

export class ListAllCategoryController{
    async handle(request:Request, response:Response):Promise<Response>{
        const listCategoryUseCase = container.resolve(ListCategoryUseCase);
        const categories = await listCategoryUseCase.execute()

        try {
            return response.status(200).json({categories})
        } catch (error ) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
              } else {
                return response.status(500).json({ error: "Internal Server Error" });
              }
        }

    }
}