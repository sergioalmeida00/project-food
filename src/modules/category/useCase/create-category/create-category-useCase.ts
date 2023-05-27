import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { CategoryDTO } from "../../DTO/category-dto";
import { Validation } from "../../../../shared/provider/Validation";

@injectable()
export class CreateCategoryUseCase{
    constructor(
        @inject('KnexCategoryRepository')
        private categoryRepository:ICategoryRepository
    ){}

    async execute({name}:CategoryDTO):Promise<CategoryDTO>{

        const requiredFields = {
            name:'Name is required!'
        }

        Validation.validateRequiredFields({name},requiredFields)

        const resultCategory = await this.categoryRepository.create({name})

        return resultCategory

    }
}