import { container } from 'tsyringe'
import { IUserRepository } from '../../modules/user/repositories/IUserRepository'
import { KnexUserRepository } from '../../modules/user/repositories/implementations/knex/knex-user-repository'
import { ICategoryRepository } from '../../modules/category/repositories/ICategoryRepository'
import { KnexCategoryRepository } from '../../modules/category/repositories/implementations/knex/KnexCategoryRepository'
import { IRecipeRepository } from '../../modules/recipe/repositories/IRecipeRepository'
import { KnexRecipeRepository } from '../../modules/recipe/repositories/implementations/knex/knex-recipe-repository'

container.registerSingleton<IUserRepository>(
  'KnexUserRepository',
  KnexUserRepository,
)

container.registerSingleton<ICategoryRepository>(
  'KnexCategoryRepository',
  KnexCategoryRepository
)

container.registerSingleton<IRecipeRepository>(
  'KnexRecipeRepository',
  KnexRecipeRepository
)
