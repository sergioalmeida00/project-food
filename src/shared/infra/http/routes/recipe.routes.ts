import { Router } from "express";
import { CreateRecipeController } from "../../../../modules/recipe/useCase/create-recipe/create-recipe-controller";
import multer from "multer";
import {MULTER} from '../../../../config/upload'
import { authenticate } from "../middleware/authenticate";

const routerRecipe = Router()
const createRecipeController = new CreateRecipeController()
const upload = multer(MULTER)

routerRecipe.post('/', authenticate, upload.single('file') ,createRecipeController.handle)

export {routerRecipe}