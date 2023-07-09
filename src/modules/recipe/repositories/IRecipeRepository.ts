import { RecipeDTO } from "../DTO/recipe-dto";

interface IRecipeRepository{
    create({title,description,avatar,time,difficulty,category_id,user_id}:RecipeDTO):Promise<RecipeDTO>
    findById({id,user_id}:Pick<RecipeDTO, 'id' | 'user_id'>):Promise<RecipeDTO>
    deleteById({id,user_id}:Pick<RecipeDTO, 'id' | 'user_id'>):Promise<void>
    findAll(search?:string):Promise<RecipeDTO[]>
    update({
        id,
        title,
        description,
        difficulty,
        avatar,
        time,
        category_id,
        user_id
    }:RecipeDTO):Promise<void>
}

export {IRecipeRepository}