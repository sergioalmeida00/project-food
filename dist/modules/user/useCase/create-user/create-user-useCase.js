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

// src/modules/user/useCase/create-user/create-user-useCase.ts
var create_user_useCase_exports = {};
__export(create_user_useCase_exports, {
  CreateUserUseCase: () => CreateUserUseCase
});
module.exports = __toCommonJS(create_user_useCase_exports);
var import_tsyringe = require("tsyringe");
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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("KnexUserRepository"))
], CreateUserUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserUseCase
});
