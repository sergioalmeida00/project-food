import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { CategoryDTO } from "../../DTO/category-dto";

@injectable()
export class CreateCategoryUseCase{
    constructor(
        @inject('KnexCategoryRepository')
        private categoryRepository:ICategoryRepository
    ){}

    async execute({name}:CategoryDTO):Promise<CategoryDTO>{

        if(name.trim().length === 0){
            throw new Error("Description not null");            
        }

        const resultCategory = await this.categoryRepository.create({name})

        return resultCategory

    }
}