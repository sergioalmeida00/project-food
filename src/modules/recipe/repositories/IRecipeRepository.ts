import { RecipeDTO } from "../DTO/recipe-dto";

interface IRecipeRepository{
    create({title,description,avatar,time,difficulty,category_id,user_id}:RecipeDTO):Promise<RecipeDTO>
}

export {IRecipeRepository}