"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/modules/recipe/useCase/create-recipe/create-recipe-controller.ts
var create_recipe_controller_exports = {};
__export(create_recipe_controller_exports, {
  CreateRecipeController: () => CreateRecipeController
});
module.exports = __toCommonJS(create_recipe_controller_exports);
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

// src/shared/provider/DiskStorage.ts
var import_fs = __toESM(require("fs"));
var import_path2 = require("path");

// src/config/upload.ts
var import_path = require("path");
var import_multer = __toESM(require("multer"));
var import_node_crypto = require("crypto");
var TMP_FOLDER = (0, import_path.resolve)(__dirname, "..", "..", "tmp");
var UPLOADS_FOLDER = (0, import_path.resolve)(TMP_FOLDER, "uploads");
var MULTER = {
  storage: import_multer.default.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = (0, import_node_crypto.randomUUID)();
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    }
  })
};

// src/shared/provider/DiskStorage.ts
var DiskStorage = class {
  async saveFile(file) {
    await import_fs.default.promises.rename(
      (0, import_path2.resolve)(TMP_FOLDER, file),
      (0, import_path2.resolve)(UPLOADS_FOLDER, file)
    );
    return file;
  }
  async deleteFile(file) {
    const filePath = (0, import_path2.resolve)(UPLOADS_FOLDER, file);
    try {
      await import_fs.default.promises.stat(filePath);
    } catch {
      return;
    }
    await import_fs.default.promises.unlink(filePath);
  }
};

// src/modules/recipe/useCase/create-recipe/create-recipe-controller.ts
var CreateRecipeController = class {
  async handle(request, response) {
    const createRecipeUseCase = import_tsyringe2.container.resolve(CreateRecipeUseCase);
    const { id: userId } = request.user;
    const filePath = request.file?.filename;
    const { title, description, time, difficulty, category_id } = request.body;
    try {
      await new DiskStorage().saveFile(filePath);
      const resultRecipe = await createRecipeUseCase.execute({
        title,
        description,
        avatar: filePath,
        time,
        difficulty,
        category_id,
        user_id: userId
      });
      return response.status(201).json({ resultRecipe });
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
  CreateRecipeController
});
