import { inject, injectable } from "tsyringe";
import { IRecipeRepository } from "../../repositories/IRecipeRepository";
import { RecipeDTO } from "../../DTO/recipe-dto";
import { Validation } from "../../../../shared/provider/Validation";

@injectable()
export class ListByIdRecipeUseCase{
    constructor(
        @inject('KnexRecipeRepository')
        private recipeRepository:IRecipeRepository
    ){}

    async execute({id,user_id}:Pick<RecipeDTO, 'id' | 'user_id'>):Promise<RecipeDTO>{

        const requiredFields ={
            id:'Id Recipe is null',
            user_id:'User is required!'
        }

        Validation.validateRequiredFields({id,user_id},requiredFields )
        const resultRecipe = await this.recipeRepository.findById({ id,user_id })

        return resultRecipe
    }
}