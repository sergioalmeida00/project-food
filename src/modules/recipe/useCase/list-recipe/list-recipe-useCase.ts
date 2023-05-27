import { inject, injectable } from "tsyringe";
import { RecipeDTO } from "../../DTO/recipe-dto";
import { IRecipeRepository } from "../../repositories/IRecipeRepository";

@injectable()
export class ListRecipeUseCase{
    constructor(
        @inject('KnexRecipeRepository')
        private recipeRepository:IRecipeRepository
    ){}

    async execute():Promise<RecipeDTO[]>{
        const resultRecipe = await this.recipeRepository.findAll()

        return resultRecipe
    }
}