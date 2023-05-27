import { inject, injectable } from "tsyringe";
import { IRecipeRepository } from "../../repositories/IRecipeRepository";
import { RecipeDTO } from "../../DTO/recipe-dto";
import { Validation } from "../../../../shared/provider/Validation";

@injectable()
export class CreateRecipeUseCase{
    constructor(
        @inject('KnexRecipeRepository')
        private recipeRepository:IRecipeRepository
    ){}

    async execute({title,description,avatar,time,difficulty,category_id,user_id}:RecipeDTO):Promise<RecipeDTO>{

        const requiredFields = {
            title:'Title is required!',
            avatar:'Image is required!',
            description:'Description is required!',
            time:'Time is required!',
            difficulty:'Difficulty is required!',
            category_id:'Category id required!',
            user_id:'User is required!'
        }

        Validation.validateRequiredFields(
            {
                title,
                avatar,
                description,
                time,
                difficulty,
                category_id,
                user_id
            },
            requiredFields
        )

        const resultRecipe = await this.recipeRepository.create({title,description,avatar,time,difficulty,category_id,user_id})

        return resultRecipe
    }
}