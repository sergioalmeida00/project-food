import { Router } from "express";
import { CreateRecipeController } from "../../../../modules/recipe/useCase/create-recipe/create-recipe-controller";
import multer from "multer";
import {MULTER} from '../../../../config/upload'
import { authenticate } from "../middleware/authenticate";
import { DeleteRecipeController } from "../../../../modules/recipe/useCase/delete-recipe/delete-recipe-controller";
import { ListRecipeController } from "../../../../modules/recipe/useCase/list-recipe/list-recipe-controller";
import { UpdateRecipeController } from "../../../../modules/recipe/useCase/update-recipe/update-recipe-controller";

const routerRecipe = Router()
const createRecipeController = new CreateRecipeController()
const listRecipeController = new ListRecipeController()
const updateRecipeController = new UpdateRecipeController()
const deleteRecipeController = new DeleteRecipeController()
const upload = multer(MULTER)

routerRecipe.post('/', authenticate, upload.single('file') ,createRecipeController.handle)
routerRecipe.get('/', listRecipeController.handle)
routerRecipe.put('/:id',authenticate ,upload.single('file'), updateRecipeController.handle)
routerRecipe.delete('/:id', authenticate, deleteRecipeController.handle)


export {routerRecipe}