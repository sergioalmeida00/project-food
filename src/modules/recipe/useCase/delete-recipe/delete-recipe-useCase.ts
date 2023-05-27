import { inject, injectable } from "tsyringe";
import { IRecipeRepository } from "../../repositories/IRecipeRepository";
import { AppError } from "../../../../shared/Errors/AppError";
import { RecipeDTO } from "../../DTO/recipe-dto";

@injectable()
export class DeleteRecipeUseCase{
    constructor(
        @inject('KnexRecipeRepository')
        private recipeRepository: IRecipeRepository
    ){}

    async execute({id,user_id}:Pick<RecipeDTO,'id' | 'user_id'>):Promise<void>{
        const recipe = await this.recipeRepository.findById({
            id,
            user_id
        })

        if(!recipe){
            throw new AppError("Recipe does not exist");            
        }

        await this.recipeRepository.deleteById({
            id,
            user_id
        })

    }
}