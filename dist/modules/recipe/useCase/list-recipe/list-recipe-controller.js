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

// src/modules/recipe/useCase/list-recipe/list-recipe-controller.ts
var list_recipe_controller_exports = {};
__export(list_recipe_controller_exports, {
  ListRecipeController: () => ListRecipeController
});
module.exports = __toCommonJS(list_recipe_controller_exports);
var import_tsyringe2 = require("tsyringe");

// src/modules/recipe/useCase/list-recipe/list-recipe-useCase.ts
var import_tsyringe = require("tsyringe");
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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("KnexRecipeRepository"))
], ListRecipeUseCase);

// src/shared/Errors/AppError.ts
var AppError = class {
  constructor(message, statusCode = 401) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/recipe/useCase/list-recipe/list-recipe-controller.ts
var ListRecipeController = class {
  async handle(request, response) {
    const listRecipeUseCase = import_tsyringe2.container.resolve(ListRecipeUseCase);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListRecipeController
});
