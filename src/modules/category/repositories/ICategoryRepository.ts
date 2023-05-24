import { CategoryDTO } from "../DTO/category-dto";

interface ICategoryRepository{
    create({name}:CategoryDTO):Promise<CategoryDTO>
    findAll():Promise<CategoryDTO[]>
}

export {ICategoryRepository}