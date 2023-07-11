import { Router } from "express";
import { AuthUserController } from "../../../../modules/user/useCase/auth-user/auth-user-controller";
import { AuthGoogleController } from "../../../../modules/user/useCase/auth-google/auth-google-controller";

const routerAuth = Router()
const authUserController = new AuthUserController()
const authGoogleController = new AuthGoogleController()

routerAuth.post('/', authUserController.handle)
routerAuth.post('/me', authGoogleController.handle)

export {routerAuth}