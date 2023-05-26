import { Router } from 'express'
import { routerUser } from './user.routes'
import { routerCategory } from './category.routes'
import { routerAuth } from './auth.routes'
import { routerRecipe } from './recipe.routes'

const router = Router()

router.use('/user', routerUser)
router.use('/recipe',routerRecipe)
router.use('/category', routerCategory)
router.use('/auth', routerAuth)

export { router }
