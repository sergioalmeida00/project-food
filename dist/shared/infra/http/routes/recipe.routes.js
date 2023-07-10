"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/shared/infra/http/routes/recipe.routes.ts
var recipe_routes_exports = {};
__export(recipe_routes_exports, {
  routerRecipe: () => routerRecipe
});
module.exports = __toCommonJS(recipe_routes_exports);
var import_express = require("express");

// src/modules/recipe/useCase/create-recipe/create-recipe-controller.ts
var import_tsyringe2 = require("tsyringe");

// src/modules/recipe/useCase/create-recipe/create-recipe-useCase.ts
var import_tsyringe = require("tsyringe");

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

// src/modules/recipe/useCase/create-recipe/create-recipe-useCase.ts
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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("KnexRecipeRepository"))
], CreateRecipeUseCase);

// src/modules/recipe/useCase/create-recipe/create-recipe-controller.ts
var CreateRecipeController = class {
  async handle(request, response) {
    const createRecipeUseCase = import_tsyringe2.container.resolve(CreateRecipeUseCase);
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

// src/shared/infra/http/middleware/authenticate.ts
var import_jsonwebtoken = require("jsonwebtoken");

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

// src/shared/infra/http/middleware/authenticate.ts
function authenticate(request, response, next) {
  const { authorization } = request.headers;
  if (!authorization) {
    throw new AppError("JWT Token Missing Error");
  }
  const [, token] = authorization.split(" ");
  try {
    const { sub: userId } = (0, import_jsonwebtoken.verify)(
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

// src/modules/recipe/useCase/delete-recipe/delete-recipe-controller.ts
var import_tsyringe4 = require("tsyringe");

// src/modules/recipe/useCase/delete-recipe/delete-recipe-useCase.ts
var import_tsyringe3 = require("tsyringe");
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
  (0, import_tsyringe3.injectable)(),
  __decorateParam(0, (0, import_tsyringe3.inject)("KnexRecipeRepository"))
], DeleteRecipeUseCase);

// src/modules/recipe/useCase/delete-recipe/delete-recipe-controller.ts
var DeleteRecipeController = class {
  async handle(request, response) {
    const deleteRecipeUseCase = import_tsyringe4.container.resolve(DeleteRecipeUseCase);
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
var import_tsyringe6 = require("tsyringe");

// src/modules/recipe/useCase/list-recipe/list-recipe-useCase.ts
var import_tsyringe5 = require("tsyringe");
var ListRecipeUseCase = class {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }
  async execute(page, search) {
    const limitPage = 9;
    let lastPage = 1;
    const countRecipe = await this.recipeRepository.countRecipe();
    if (countRecipe != 0) {
      lastPage = Math.ceil(Number(countRecipe) / limitPage);
    }
    const offset = Number(page * limitPage - limitPage);
    const resultRecipe = await this.recipeRepository.findAll(offset, limitPage, search);
    return {
      recipes: resultRecipe,
      lastPage,
      total: Number(countRecipe)
    };
  }
};
ListRecipeUseCase = __decorateClass([
  (0, import_tsyringe5.injectable)(),
  __decorateParam(0, (0, import_tsyringe5.inject)("KnexRecipeRepository"))
], ListRecipeUseCase);

// src/modules/recipe/useCase/list-recipe/list-recipe-controller.ts
var ListRecipeController = class {
  async handle(request, response) {
    const listRecipeUseCase = import_tsyringe6.container.resolve(ListRecipeUseCase);
    const { search } = request.query;
    const { page = 1 } = request.query;
    try {
      const resultRecipe = await listRecipeUseCase.execute(
        Number(page),
        String(search)
      );
      return response.status(200).json(resultRecipe);
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
var import_tsyringe8 = require("tsyringe");

// src/modules/recipe/useCase/update-recipe/update-recipe-useCase.ts
var import_tsyringe7 = require("tsyringe");
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
  (0, import_tsyringe7.injectable)(),
  __decorateParam(0, (0, import_tsyringe7.inject)("KnexRecipeRepository"))
], UpdateRecipeUseCase);

// src/modules/recipe/useCase/update-recipe/update-recipe-controller.ts
var UpdateRecipeController = class {
  async handle(request, response) {
    const updateRecipeUseCase = import_tsyringe8.container.resolve(UpdateRecipeUseCase);
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
var import_tsyringe10 = require("tsyringe");

// src/modules/recipe/useCase/listById-recipe/listById-recipe-useCase.ts
var import_tsyringe9 = require("tsyringe");
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
  (0, import_tsyringe9.injectable)(),
  __decorateParam(0, (0, import_tsyringe9.inject)("KnexRecipeRepository"))
], ListByIdRecipeUseCase);

// src/modules/recipe/useCase/listById-recipe/listById-controller.ts
var ListByIdController = class {
  async handle(request, response) {
    const listByIdUseCase = import_tsyringe10.container.resolve(ListByIdRecipeUseCase);
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
var routerRecipe = (0, import_express.Router)();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routerRecipe
});
