import { inject, injectable } from "tsyringe";
import { IRecipeRepository } from "../../repositories/IRecipeRepository";
import { RecipeDTO } from "../../DTO/recipe-dto";
import { AppError } from "../../../../shared/Errors/AppError";
import { DiskStorage } from "../../../../shared/provider/DiskStorage";

@injectable()
export class UpdateRecipeUseCase{
    constructor(
        @inject('KnexRecipeRepository')
        private recipeRepository:IRecipeRepository
    ){}

    async execute({
        id,
        title,
        description,
        avatar,
        time,
        category_id,
        difficulty,
        user_id
    }:RecipeDTO):Promise<void>{
        const recipeExists = await this.recipeRepository.findById({id, user_id})
        // const diskStorage = new DiskStorage()

        if(!recipeExists){
            throw new AppError("Recite does not exist!");            
        }

        // if(avatar){
        //     await diskStorage.deleteFile(recipeExists.avatar!)
        //     await diskStorage.saveFile(avatar)
        // }

        const recipeNew: RecipeDTO = {
            id,
            title: title.trim() !== '' ? title : recipeExists.title,
            description: description.trim() !== '' ? description : recipeExists.description,
            avatar: avatar?.trim() !== '' ? avatar : recipeExists.avatar,
            time: time.trim() !== '' ? time : recipeExists.time,
            category_id: category_id.trim() !== '' ? category_id : recipeExists.category_id,
            difficulty: difficulty !== undefined ? difficulty : recipeExists.difficulty,
            user_id
          };

        await this.recipeRepository.update(recipeNew)
    }
}