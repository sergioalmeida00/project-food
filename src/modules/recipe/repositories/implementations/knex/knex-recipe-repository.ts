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

    async findById({id,user_id}:Pick<RecipeDTO, 'id' | 'user_id'>): Promise<RecipeDTO> {
        const resultRecipe = await knex('recipe')
            .where({id})
            .andWhere({user_id})
            .first()

        return resultRecipe
    }

    async deleteById({id,user_id}:Pick<RecipeDTO, 'id' | 'user_id'>):Promise<void> {
        await knex('recipe')
            .where({id})
            .andWhere({user_id})
            .del()
    }

    async findAll(offset: number, limitPage: number, search?: string): Promise<RecipeDTO[]> {
        
        let resultRecipe

        if (search !== 'undefined') {
            resultRecipe = await knex.select('*').from('recipe').whereILike('description',`%${search}%`).orderBy('title').limit(limitPage).offset(offset)
        }else{            
            resultRecipe = await knex.select('*').from('recipe').orderBy('title').limit(limitPage).offset(offset)
        }

       return resultRecipe
    }

    async update({ id, title, description,difficulty, avatar, time, category_id, user_id}: RecipeDTO): Promise<void> {
      await knex('recipe')
        .where({id})
        .andWhere({user_id})
        .update({
            title,
            description,
            avatar,
            difficulty,
            time,
            category_id
        })
    }

    async countRecipe(): Promise<Number> {
        const result = await knex('recipe').count().first();
        const count = result ? Number(result.count) : 0;
        return count;
      }
}