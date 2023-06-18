"use strict";

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
  DATABASE_PORT: import_zod.z.coerce.number(),
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
  async findAll() {
    const resultRecipe = knex.select("*").from("recipe");
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
