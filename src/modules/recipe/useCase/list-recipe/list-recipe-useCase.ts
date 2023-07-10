import { inject, injectable } from "tsyringe";
import { RecipeDTO } from "../../DTO/recipe-dto";
import { IRecipeRepository } from "../../repositories/IRecipeRepository";

@injectable()
export class ListRecipeUseCase{
    constructor(
        @inject('KnexRecipeRepository')
        private recipeRepository:IRecipeRepository
    ){}

    async execute(page:number , search?:string, ):Promise<{ recipes: RecipeDTO[]; lastPage: number, total:number }>{

        const limitPage = 9;
        let lastPage = 1;
        const countRecipe = await this.recipeRepository.countRecipe()
    
        if(countRecipe != 0){
            lastPage = Math.ceil(Number(countRecipe) / limitPage)
        }

        const offset:number = Number((page * limitPage) - limitPage);
    
        const resultRecipe = await this.recipeRepository.findAll(offset,limitPage, search)        
        
        return {
            recipes:resultRecipe,
            lastPage,
            total:Number(countRecipe)
        }
    }
}