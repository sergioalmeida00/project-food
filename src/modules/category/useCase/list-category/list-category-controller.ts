import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCase } from "./list-category-useCase";

export class ListAllCategoryController{
    async handle(request:Request, response:Response):Promise<Response>{
        const listCategoryUseCase = container.resolve(ListCategoryUseCase);
        const categories = await listCategoryUseCase.execute()

        try {
            return response.status(200).json({categories})
        } catch (error) {
            console.log(error)
            return response.status(404)
        }

    }
}