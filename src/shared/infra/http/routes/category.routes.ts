import { Router } from "express";
import { CreateCategoryController } from "../../../../modules/category/useCase/create-category/create-category-Controller";
import { ListAllCategoryController } from "../../../../modules/category/useCase/list-category/list-category-controller";
import { authenticate } from "../middleware/authenticate";

const routerCategory = Router()
const createCategoryController = new CreateCategoryController()
const listAllCategoryController = new ListAllCategoryController()

routerCategory.post('/',authenticate, createCategoryController.handle)
routerCategory.get('/',listAllCategoryController.handle)

export {routerCategory}