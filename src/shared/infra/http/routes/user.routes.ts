import { Router } from 'express'
import { CreateUserController } from '../../../../modules/user/useCase/create-user/create-user-controller'

const routerUser = Router()

const createUserController = new CreateUserController()

routerUser.post('/', createUserController.handle)

export { routerUser }
