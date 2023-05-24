import { Router } from "express";
import { AuthUserController } from "../../../../modules/user/useCase/auth-user/auth-user-controller";

const routerAuth = Router()
const authUserController = new AuthUserController()

routerAuth.post('/', authUserController.handle)

export {routerAuth}