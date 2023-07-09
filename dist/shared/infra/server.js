"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/shared/infra/app.ts
var import_reflect_metadata = require("reflect-metadata");
var import_express_async_errors = require("express-async-errors");

// src/shared/container/index.ts
var import_tsyringe = require("tsyringe");

// src/database.ts
var import_knex = require("knex");

// src/env/index.ts
var import_dotenv = require("dotenv");
var import_zod = require("zod");
if (process.env.NODE_ENV === "test") {
  (0, import_dotenv.config)({ path: ".env.test" });
} else {
  (0, import_dotenv.config)();
}
var envSchema = import_zod.z.object({
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number().optional(),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_PASS: import_zod.z.string(),
  DATABASE_DB: import_zod.z.string(),
  PORT: import_zod.z.coerce.number().default(3001),
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("production")
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid variable", _env.error.format());
  throw new Error("Invalid");
}
var env = _env.data;

// src/database.ts
var config2 = {
  client: "pg",
  connection: {
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    user: env.DATABASE_USER,
    password: env.DATABASE_PASS,
    database: env.DATABASE_DB,
    ssl: { rejectUnauthorized: false }
  },
  migrations: {
    tableName: "migrations"
  }
};
var knex = (0, import_knex.knex)(config2);

// src/modules/user/repositories/implementations/knex/knex-user-repository.ts
var KnexUserRepository = class {
  async create({ name, email, password }) {
    const resultUser = await knex("users").insert({
      name,
      email,
      password
    }).returning("*");
    return resultUser[0];
  }
  async findByEmail(email) {
    const resultEmail = await knex("users").where({ email }).first();
    return resultEmail;
  }
  async findByIdUser(id) {
    const resultUser = await knex("users").where({ id }).first();
    return resultUser;
  }
};

// src/modules/category/repositories/implementations/knex/KnexCategoryRepository.ts
var KnexCategoryRepository = class {
  async create({ name }) {
    const resultCategory = await knex("category").insert({ name }).returning("*");
    return resultCategory[0];
  }
  async findAll() {
    const categories = knex("category").select("*");
    return categories;
  }
};

// src/modules/recipe/repositories/implementations/knex/knex-recipe-repository.ts
var KnexRecipeRepository = class {
  async create({ title, description, avatar, time, difficulty, category_id, user_id }) {
    const resultRecipe = await knex("recipe").insert({
      title,
      description,
      avatar,
      time,
      difficulty,
      category_id,
      user_id
    }).returning("*");
    return resultRecipe[0];
  }
  async findById({ id, user_id }) {
    const resultRecipe = await knex("recipe").where({ id }).andWhere({ user_id }).first();
    return resultRecipe;
  }
  async deleteById({ id, user_id }) {
    await knex("recipe").where({ id }).andWhere({ user_id }).del();
  }
  async findAll(search) {
    let resultRecipe;
    if (search !== "undefined") {
      resultRecipe = await knex.select("*").from("recipe").whereILike("description", `%${search}%`);
    } else {
      resultRecipe = await knex.select("*").from("recipe");
    }
    return resultRecipe;
  }
  async update({ id, title, description, difficulty, avatar, time, category_id, user_id }) {
    await knex("recipe").where({ id }).andWhere({ user_id }).update({
      title,
      description,
      avatar,
      difficulty,
      time,
      category_id
    });
  }
};

// src/shared/container/index.ts
import_tsyringe.container.registerSingleton(
  "KnexUserRepository",
  KnexUserRepository
);
import_tsyringe.container.registerSingleton(
  "KnexCategoryRepository",
  KnexCategoryRepository
);
import_tsyringe.container.registerSingleton(
  "KnexRecipeRepository",
  KnexRecipeRepository
);

// src/shared/infra/app.ts
var import_express6 = __toESM(require("express"));
var import_config = require("dotenv/config");

// src/shared/infra/http/routes/index.ts
var import_express5 = require("express");

// src/shared/infra/http/routes/user.routes.ts
var import_express = require("express");

// src/modules/user/useCase/create-user/create-user-controller.ts
var import_tsyringe3 = require("tsyringe");

// src/modules/user/useCase/create-user/create-user-useCase.ts
var import_tsyringe2 = require("tsyringe");
var import_bcryptjs = require("bcryptjs");

// src/shared/Errors/AppError.ts
var AppError = class {
  constructor(message, statusCode = 401) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/shared/provider/Validation.ts
var Validation = class {
  static validateRequiredFields(obj, requiredFields) {
    const missingFields = Object.keys(requiredFields).filter((field) => !obj[field]);
    if (missingFields.length > 0) {
      const missingFieldsMessages = missingFields.map(
        (field) => requiredFields[field]
      );
      throw new AppError(`Missing required fields: ${missingFieldsMessages.join(", ")}`);
    }
  }
};

// src/modules/user/useCase/create-user/create-user-useCase.ts
var import_jsonwebtoken = require("jsonwebtoken");
var CreateUserUseCase = class {
  constructor(useRepository) {
    this.useRepository = useRepository;
  }
  async execute({ name, email, password }) {
    const requiredFields = {
      name: "Name is required!",
      email: "Email is required!",
      password: "Password is required!"
    };
    Validation.validateRequiredFields(
      { name, email, password },
      requiredFields
    );
    const passwordHash = await (0, import_bcryptjs.hash)(password, 8);
    const emailExists = await this.useRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError("e-mail j\xE1 cadastrado");
    }
    const resultUser = await this.useRepository.create({
      name,
      email,
      password: passwordHash
    });
    const token = (0, import_jsonwebtoken.sign)(
      {
        email,
        name,
        id: resultUser.id
      },
      `${process.env.JWT_PASS}`,
      { expiresIn: process.env.JWT_EXPIRE, subject: resultUser.id }
    );
    const data = {
      id: resultUser.id,
      name,
      email,
      token
    };
    return data;
  }
};
CreateUserUseCase = __decorateClass([
  (0, import_tsyringe2.injectable)(),
  __decorateParam(0, (0, import_tsyringe2.inject)("KnexUserRepository"))
], CreateUserUseCase);

// src/modules/user/useCase/create-user/create-user-controller.ts
var CreateUserController = class {
  async handle(request, response) {
    const { name, email, password } = request.body;
    const createUserUseCase = import_tsyringe3.container.resolve(CreateUserUseCase);
    try {
      const resultUser = await createUserUseCase.execute({
        name,
        email,
        password
      });
      return response.status(201).json({ resultUser });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};

// src/shared/infra/http/routes/user.routes.ts
var routerUser = (0, import_express.Router)();
var createUserController = new CreateUserController();
routerUser.post("/", createUserController.handle);

// src/shared/infra/http/routes/category.routes.ts
var import_express2 = require("express");

// src/modules/category/useCase/create-category/create-category-Controller.ts
var import_tsyringe5 = require("tsyringe");

// src/modules/category/useCase/create-category/create-category-useCase.ts
var import_tsyringe4 = require("tsyringe");
var CreateCategoryUseCase = class {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async execute({ name }) {
    const requiredFields = {
      name: "Name is required!"
    };
    Validation.validateRequiredFields({ name }, requiredFields);
    const resultCategory = await this.categoryRepository.create({ name });
    return resultCategory;
  }
};
CreateCategoryUseCase = __decorateClass([
  (0, import_tsyringe4.injectable)(),
  __decorateParam(0, (0, import_tsyringe4.inject)("KnexCategoryRepository"))
], CreateCategoryUseCase);

// src/modules/category/useCase/create-category/create-category-Controller.ts
var CreateCategoryController = class {
  async handle(request, response) {
    const { name } = request.body;
    const createCategoryUseCase = import_tsyringe5.container.resolve(CreateCategoryUseCase);
    try {
      const resultCategory = await createCategoryUseCase.execute({ name });
      return response.status(201).json({ resultCategory });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};

// src/modules/category/useCase/list-category/list-category-controller.ts
var import_tsyringe7 = require("tsyringe");

// src/modules/category/useCase/list-category/list-category-useCase.ts
var import_tsyringe6 = require("tsyringe");
var ListCategoryUseCase = class {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async execute() {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
};
ListCategoryUseCase = __decorateClass([
  (0, import_tsyringe6.injectable)(),
  __decorateParam(0, (0, import_tsyringe6.inject)("KnexCategoryRepository"))
], ListCategoryUseCase);

// src/modules/category/useCase/list-category/list-category-controller.ts
var ListAllCategoryController = class {
  async handle(request, response) {
    const listCategoryUseCase = import_tsyringe7.container.resolve(ListCategoryUseCase);
    const categories = await listCategoryUseCase.execute();
    try {
      return response.status(200).json({ categories });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};

// src/shared/infra/http/middleware/authenticate.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
function authenticate(request, response, next) {
  const { authorization } = request.headers;
  if (!authorization) {
    throw new AppError("JWT Token Missing Error");
  }
  const [, token] = authorization.split(" ");
  try {
    const { sub: userId } = (0, import_jsonwebtoken2.verify)(
      token,
      process.env.JWT_PASS ?? ""
    );
    const verifyUserExists = new KnexUserRepository().findByIdUser(userId);
    if (!verifyUserExists) {
      throw new AppError("User does not exist");
    }
    request.user = {
      id: userId
    };
    next();
  } catch (error) {
    throw new AppError("JWT Token Invalid");
  }
}

// src/shared/infra/http/routes/category.routes.ts
var routerCategory = (0, import_express2.Router)();
var createCategoryController = new CreateCategoryController();
var listAllCategoryController = new ListAllCategoryController();
routerCategory.post("/", authenticate, createCategoryController.handle);
routerCategory.get("/", listAllCategoryController.handle);

// src/shared/infra/http/routes/auth.routes.ts
var import_express3 = require("express");

// src/modules/user/useCase/auth-user/auth-user-controller.ts
var import_tsyringe9 = require("tsyringe");

// src/modules/user/useCase/auth-user/auth-user-useCase.ts
var import_tsyringe8 = require("tsyringe");
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken3 = require("jsonwebtoken");
var AuthUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ email, password }) {
    const requiredFields = {
      email: "E-mail is required!",
      password: "Password is required!"
    };
    Validation.validateRequiredFields({ email, password }, requiredFields);
    const emailUserExists = await this.userRepository.findByEmail(email);
    if (!emailUserExists) {
      throw new AppError("e-mail n\xE3o cadastrado", 404);
    }
    const passwordMatch = (0, import_bcryptjs2.compare)(password, emailUserExists.password);
    if (!passwordMatch) {
      throw new AppError("senha incorreta", 404);
    }
    const token = (0, import_jsonwebtoken3.sign)(
      {
        email: emailUserExists.email,
        name: emailUserExists.name,
        id: emailUserExists.id
      },
      `${process.env.JWT_PASS}`,
      { expiresIn: process.env.JWT_EXPIRE, subject: emailUserExists.id }
    );
    const resultUser = {
      id: emailUserExists.id,
      name: emailUserExists.name,
      email: emailUserExists.email,
      token
    };
    return { resultUser };
  }
};
AuthUserUseCase = __decorateClass([
  (0, import_tsyringe8.injectable)(),
  __decorateParam(0, (0, import_tsyringe8.inject)("KnexUserRepository"))
], AuthUserUseCase);

// src/modules/user/useCase/auth-user/auth-user-controller.ts
var AuthUserController = class {
  async handle(request, response, next) {
    const { email, password } = request.body;
    const authUserUseCase = import_tsyringe9.container.resolve(AuthUserUseCase);
    try {
      const data = await authUserUseCase.execute({ email, password });
      return response.status(201).json(data);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};

// src/shared/infra/http/routes/auth.routes.ts
var routerAuth = (0, import_express3.Router)();
var authUserController = new AuthUserController();
routerAuth.post("/", authUserController.handle);

// src/shared/infra/http/routes/recipe.routes.ts
var import_express4 = require("express");

// src/modules/recipe/useCase/create-recipe/create-recipe-controller.ts
var import_tsyringe11 = require("tsyringe");

// src/modules/recipe/useCase/create-recipe/create-recipe-useCase.ts
var import_tsyringe10 = require("tsyringe");
var CreateRecipeUseCase = class {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }
  async execute({ title, description, avatar, time, difficulty, category_id, user_id }) {
    const requiredFields = {
      title: "Title is required!",
      avatar: "Image is required!",
      description: "Description is required!",
      time: "Time is required!",
      difficulty: "Difficulty is required!",
      category_id: "Category id required!",
      user_id: "User is required!"
    };
    Validation.validateRequiredFields(
      {
        title,
        avatar,
        description,
        time,
        difficulty,
        category_id,
        user_id
      },
      requiredFields
    );
    const resultRecipe = await this.recipeRepository.create({ title, description, avatar, time, difficulty, category_id, user_id });
    return resultRecipe;
  }
};
CreateRecipeUseCase = __decorateClass([
  (0, import_tsyringe10.injectable)(),
  __decorateParam(0, (0, import_tsyringe10.inject)("KnexRecipeRepository"))
], CreateRecipeUseCase);

// src/modules/recipe/useCase/create-recipe/create-recipe-controller.ts
var CreateRecipeController = class {
  async handle(request, response) {
    const createRecipeUseCase = import_tsyringe11.container.resolve(CreateRecipeUseCase);
    const { id: userId } = request.user;
    const { title, description, time, difficulty, category_id, avatar } = request.body;
    try {
      const validDifficulties = ["FACIL", "MEDIO", "DIFICIL"];
      if (!validDifficulties.includes(difficulty.toUpperCase())) {
        throw new AppError("Difficulty is not an enum", 400);
      }
      const resultRecipe = await createRecipeUseCase.execute({
        title,
        description,
        avatar,
        time,
        difficulty: difficulty.toUpperCase(),
        category_id,
        user_id: userId
      });
      return response.status(201).json({ resultRecipe });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};

// src/modules/recipe/useCase/delete-recipe/delete-recipe-controller.ts
var import_tsyringe13 = require("tsyringe");

// src/modules/recipe/useCase/delete-recipe/delete-recipe-useCase.ts
var import_tsyringe12 = require("tsyringe");
var DeleteRecipeUseCase = class {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }
  async execute({ id, user_id }) {
    const recipe = await this.recipeRepository.findById({
      id,
      user_id
    });
    if (!recipe) {
      throw new AppError("Recipe does not exist");
    }
    await this.recipeRepository.deleteById({
      id,
      user_id
    });
  }
};
DeleteRecipeUseCase = __decorateClass([
  (0, import_tsyringe12.injectable)(),
  __decorateParam(0, (0, import_tsyringe12.inject)("KnexRecipeRepository"))
], DeleteRecipeUseCase);

// src/modules/recipe/useCase/delete-recipe/delete-recipe-controller.ts
var DeleteRecipeController = class {
  async handle(request, response) {
    const deleteRecipeUseCase = import_tsyringe13.container.resolve(DeleteRecipeUseCase);
    const { id: userId } = request.user;
    const { id } = request.params;
    try {
      await deleteRecipeUseCase.execute({
        id,
        user_id: userId
      });
      return response.sendStatus(200);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};

// src/modules/recipe/useCase/list-recipe/list-recipe-controller.ts
var import_tsyringe15 = require("tsyringe");

// src/modules/recipe/useCase/list-recipe/list-recipe-useCase.ts
var import_tsyringe14 = require("tsyringe");
var ListRecipeUseCase = class {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }
  async execute(search) {
    const resultRecipe = await this.recipeRepository.findAll(search);
    return resultRecipe;
  }
};
ListRecipeUseCase = __decorateClass([
  (0, import_tsyringe14.injectable)(),
  __decorateParam(0, (0, import_tsyringe14.inject)("KnexRecipeRepository"))
], ListRecipeUseCase);

// src/modules/recipe/useCase/list-recipe/list-recipe-controller.ts
var ListRecipeController = class {
  async handle(request, response) {
    const listRecipeUseCase = import_tsyringe15.container.resolve(ListRecipeUseCase);
    const { search } = request.query;
    try {
      const resultRecipe = await listRecipeUseCase.execute(String(search));
      return response.status(200).json({ resultRecipe });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};

// src/modules/recipe/useCase/update-recipe/update-recipe-controller.ts
var import_tsyringe17 = require("tsyringe");

// src/modules/recipe/useCase/update-recipe/update-recipe-useCase.ts
var import_tsyringe16 = require("tsyringe");
var UpdateRecipeUseCase = class {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }
  async execute({
    id,
    title,
    description,
    avatar,
    time,
    category_id,
    difficulty,
    user_id
  }) {
    const recipeExists = await this.recipeRepository.findById({ id, user_id });
    if (!recipeExists) {
      throw new AppError("Recite does not exist!");
    }
    const recipeNew = {
      id,
      title: title.trim() !== "" ? title : recipeExists.title,
      description: description.trim() !== "" ? description : recipeExists.description,
      avatar: avatar?.trim() !== "" ? avatar : recipeExists.avatar,
      time: time.trim() !== "" ? time : recipeExists.time,
      category_id: category_id.trim() !== "" ? category_id : recipeExists.category_id,
      difficulty: difficulty !== void 0 ? difficulty : recipeExists.difficulty,
      user_id
    };
    await this.recipeRepository.update(recipeNew);
  }
};
UpdateRecipeUseCase = __decorateClass([
  (0, import_tsyringe16.injectable)(),
  __decorateParam(0, (0, import_tsyringe16.inject)("KnexRecipeRepository"))
], UpdateRecipeUseCase);

// src/modules/recipe/useCase/update-recipe/update-recipe-controller.ts
var UpdateRecipeController = class {
  async handle(request, response) {
    const updateRecipeUseCase = import_tsyringe17.container.resolve(UpdateRecipeUseCase);
    const { id } = request.params;
    const { id: userId } = request.user;
    const {
      title,
      description,
      time,
      category_id,
      difficulty,
      avatar
    } = request.body;
    try {
      await updateRecipeUseCase.execute({
        id,
        title,
        description,
        avatar,
        time,
        category_id,
        difficulty,
        user_id: userId
      });
      return response.sendStatus(204);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};

// src/modules/recipe/useCase/listById-recipe/listById-controller.ts
var import_tsyringe19 = require("tsyringe");

// src/modules/recipe/useCase/listById-recipe/listById-recipe-useCase.ts
var import_tsyringe18 = require("tsyringe");
var ListByIdRecipeUseCase = class {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }
  async execute({ id, user_id }) {
    const requiredFields = {
      id: "Id Recipe is null",
      user_id: "User is required!"
    };
    Validation.validateRequiredFields({ id, user_id }, requiredFields);
    const resultRecipe = await this.recipeRepository.findById({ id, user_id });
    return resultRecipe;
  }
};
ListByIdRecipeUseCase = __decorateClass([
  (0, import_tsyringe18.injectable)(),
  __decorateParam(0, (0, import_tsyringe18.inject)("KnexRecipeRepository"))
], ListByIdRecipeUseCase);

// src/modules/recipe/useCase/listById-recipe/listById-controller.ts
var ListByIdController = class {
  async handle(request, response) {
    const listByIdUseCase = import_tsyringe19.container.resolve(ListByIdRecipeUseCase);
    const { id: userId } = request.user;
    const { id } = request.params;
    try {
      const resultRecipe = await listByIdUseCase.execute({ id, user_id: userId });
      return response.status(200).json({ resultRecipe });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};

// src/shared/infra/http/routes/recipe.routes.ts
var routerRecipe = (0, import_express4.Router)();
var createRecipeController = new CreateRecipeController();
var listRecipeController = new ListRecipeController();
var listByIdRecipeController = new ListByIdController();
var updateRecipeController = new UpdateRecipeController();
var deleteRecipeController = new DeleteRecipeController();
routerRecipe.post("/", authenticate, createRecipeController.handle);
routerRecipe.get("/", listRecipeController.handle);
routerRecipe.get("/edit/:id", authenticate, listByIdRecipeController.handle);
routerRecipe.put("/:id", authenticate, updateRecipeController.handle);
routerRecipe.delete("/:id", authenticate, deleteRecipeController.handle);

// src/shared/infra/http/routes/index.ts
var router = (0, import_express5.Router)();
router.use("/user", routerUser);
router.use("/recipe", routerRecipe);
router.use("/category", routerCategory);
router.use("/auth", routerAuth);

// src/shared/infra/app.ts
var import_cors = __toESM(require("cors"));
var app = (0, import_express6.default)();
app.use((0, import_cors.default)());
app.use(import_express6.default.json());
app.use(router);
app.use(
  (error, request, response, next) => {
    if (error instanceof AppError) {
      console.log(error);
      return response.status(error.statusCode).json({
        error: "error",
        message: error.message
      });
    }
    console.log(error);
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${error.message}`
    });
  }
);

// src/shared/infra/server.ts
app.listen(env.PORT, () => {
  console.log("Server is Running! \u{1F680}\uFE0F\u{1F680}\uFE0F");
});
