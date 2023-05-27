import { Router } from "express";
import { CreateRecipeController } from "../../../../modules/recipe/useCase/create-recipe/create-recipe-controller";
import multer from "multer";
import {MULTER} from '../../../../config/upload'
import { authenticate } from "../middleware/authenticate";
import { DeleteRecipeController } from "../../../../modules/recipe/useCase/delete-recipe/delete-recipe-controller";

const routerRecipe = Router()
const createRecipeController = new CreateRecipeController()
const deleteRecipeController = new DeleteRecipeController()
const upload = multer(MULTER)

routerRecipe.post('/', authenticate, upload.single('file') ,createRecipeController.handle)
routerRecipe.delete('/:id', authenticate, deleteRecipeController.handle)

export {routerRecipe}