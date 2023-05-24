import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { CategoryDTO } from "../../DTO/category-dto";

@injectable()
export class ListCategoryUseCase{
    constructor(
        @inject('KnexCategoryRepository')
        private categoryRepository:ICategoryRepository
    ){}

    async execute():Promise<CategoryDTO[]>{
        const categories = await this.categoryRepository.findAll()

        return categories
    }
}