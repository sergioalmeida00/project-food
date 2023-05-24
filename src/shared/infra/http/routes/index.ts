import { Router } from 'express'
import { routerUser } from './user.routes'
import { routerCategory } from './category.routes'
import { routerAuth } from './auth.routes'

const router = Router()

router.use('/user', routerUser)
router.use('/category', routerCategory)
router.use('/auth', routerAuth)

export { router }
