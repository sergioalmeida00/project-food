import { Router } from "express";
import { CreateCategoryController } from "../../../../modules/category/useCase/create-category/create-category-Controller";
import { ListAllCategoryController } from "../../../../modules/category/useCase/list-category/list-category-controller";

const routerCategory = Router()
const createCategoryController = new CreateCategoryController()
const listAllCategoryController = new ListAllCategoryController()

routerCategory.post('/', createCategoryController.handle)
routerCategory.get('/',listAllCategoryController.handle)

export {routerCategory}