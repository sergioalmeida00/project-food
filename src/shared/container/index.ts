import { container } from 'tsyringe'
import { IUserRepository } from '../../modules/user/repositories/IUserRepository'
import { KnexUserRepository } from '../../modules/user/repositories/implementations/knex/knex-user-repository'
import { ICategoryRepository } from '../../modules/category/repositories/ICategoryRepository'
import { KnexCategoryRepository } from '../../modules/category/repositories/implementations/knex/KnexCategoryRepository'

container.registerSingleton<IUserRepository>(
  'KnexUserRepository',
  KnexUserRepository,
)

container.registerSingleton<ICategoryRepository>(
  'KnexCategoryRepository',
  KnexCategoryRepository
)
