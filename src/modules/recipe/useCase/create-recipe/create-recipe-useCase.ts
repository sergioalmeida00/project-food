import { inject, injectable } from "tsyringe";
import { IRecipeRepository } from "../../repositories/IRecipeRepository";
import { RecipeDTO } from "../../DTO/recipe-dto";

@injectable()
export class CreateRecipeUseCase{
    constructor(
        @inject('KnexRecipeRepository')
        private recipeRepository:IRecipeRepository
    ){}

    async execute({title,description,avatar,time,difficulty,category_id,user_id}:RecipeDTO):Promise<RecipeDTO>{
        const resultRecipe = await this.recipeRepository.create({title,description,avatar,time,difficulty,category_id,user_id})

        return resultRecipe
    }
}