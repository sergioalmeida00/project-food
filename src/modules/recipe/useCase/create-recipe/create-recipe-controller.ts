import { Request, Response } from "express";

export class CreateRecipeController{
    async handle (request:Request, response:Response){
        const filePath = request.file?.filename
    }
}