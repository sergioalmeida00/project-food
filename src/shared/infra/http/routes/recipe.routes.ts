import { Router } from "express";
import { CreateRecipeController } from "../../../../modules/recipe/useCase/create-recipe/create-recipe-controller";
import multer from "multer";
import {MULTER} from '../../../../config/upload'

const routerRecipe = Router()
const createRecipeController = new CreateRecipeController()
const upload = multer(MULTER)

routerRecipe.post('/', upload.single('file'),createRecipeController.handle)

export {routerRecipe}