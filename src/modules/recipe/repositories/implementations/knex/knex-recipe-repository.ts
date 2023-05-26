import { knex } from "../../../../../database";
import { RecipeDTO } from "../../../DTO/recipe-dto";
import { IRecipeRepository } from "../../IRecipeRepository";

export class KnexRecipeRepository implements IRecipeRepository{
    async create({ title, description, avatar, time, difficulty, category_id, user_id }: RecipeDTO): Promise<RecipeDTO> {
        
        const resultRecipe = await knex('recipe').insert({
            title,
            description,
            avatar,
            time, 
            difficulty, 
            category_id,
            user_id
        }).returning('*')

        return resultRecipe[0]
    }

}