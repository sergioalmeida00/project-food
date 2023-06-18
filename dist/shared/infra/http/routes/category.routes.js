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

// src/shared/infra/http/routes/category.routes.ts
var category_routes_exports = {};
__export(category_routes_exports, {
  routerCategory: () => routerCategory
});
module.exports = __toCommonJS(category_routes_exports);
var import_express = require("express");

// src/modules/category/useCase/create-category/create-category-Controller.ts
var import_tsyringe2 = require("tsyringe");

// src/modules/category/useCase/create-category/create-category-useCase.ts
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

// src/modules/category/useCase/create-category/create-category-useCase.ts
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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("KnexCategoryRepository"))
], CreateCategoryUseCase);

// src/modules/category/useCase/create-category/create-category-Controller.ts
var CreateCategoryController = class {
  async handle(request, response) {
    const { name } = request.body;
    const createCategoryUseCase = import_tsyringe2.container.resolve(CreateCategoryUseCase);
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
var import_tsyringe4 = require("tsyringe");

// src/modules/category/useCase/list-category/list-category-useCase.ts
var import_tsyringe3 = require("tsyringe");
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
  (0, import_tsyringe3.injectable)(),
  __decorateParam(0, (0, import_tsyringe3.inject)("KnexCategoryRepository"))
], ListCategoryUseCase);

// src/modules/category/useCase/list-category/list-category-controller.ts
var ListAllCategoryController = class {
  async handle(request, response) {
    const listCategoryUseCase = import_tsyringe4.container.resolve(ListCategoryUseCase);
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
    database: env.DATABASE_DB
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

// src/shared/infra/http/routes/category.routes.ts
var routerCategory = (0, import_express.Router)();
var createCategoryController = new CreateCategoryController();
var listAllCategoryController = new ListAllCategoryController();
routerCategory.post("/", authenticate, createCategoryController.handle);
routerCategory.get("/", listAllCategoryController.handle);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routerCategory
});
