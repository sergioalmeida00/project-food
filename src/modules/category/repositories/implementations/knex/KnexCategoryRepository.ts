import { knex } from "../../../../../database";
import { CategoryDTO } from "../../../DTO/category-dto";
import { ICategoryRepository } from "../../ICategoryRepository";

export class KnexCategoryRepository implements ICategoryRepository{

    async create({ name }: CategoryDTO): Promise<CategoryDTO> {
        const resultCategory = await knex('category').insert({name}).returning('*')

        return resultCategory[0]
    }
   async findAll(): Promise<CategoryDTO[]> {
        const categories = knex('category').select('*')

        return categories
    }

}