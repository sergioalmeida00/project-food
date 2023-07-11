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

// src/modules/user/useCase/auth-user/auth-user-useCase.ts
var auth_user_useCase_exports = {};
__export(auth_user_useCase_exports, {
  AuthUserUseCase: () => AuthUserUseCase
});
module.exports = __toCommonJS(auth_user_useCase_exports);
var import_tsyringe = require("tsyringe");

// src/shared/Errors/AppError.ts
var AppError = class {
  constructor(message, statusCode = 401) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/user/useCase/auth-user/auth-user-useCase.ts
var import_bcryptjs = require("bcryptjs");

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

// src/shared/provider/GenerateAuth.ts
var import_jsonwebtoken = require("jsonwebtoken");
var GenerateAuth = class {
  static token({ email, name, id }) {
    const token = (0, import_jsonwebtoken.sign)(
      {
        email,
        name,
        id
      },
      `${process.env.JWT_PASS}`,
      { expiresIn: process.env.JWT_EXPIRE, subject: id }
    );
    return {
      id,
      name,
      email,
      token
    };
  }
};

// src/modules/user/useCase/auth-user/auth-user-useCase.ts
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
    const passwordMatch = (0, import_bcryptjs.compare)(password, emailUserExists.password);
    if (!passwordMatch) {
      throw new AppError("senha incorreta", 404);
    }
    const resultUser = GenerateAuth.token({
      email: emailUserExists.email,
      name: emailUserExists.name,
      id: emailUserExists.id
    });
    return { resultUser };
  }
};
AuthUserUseCase = __decorateClass([
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("KnexUserRepository"))
], AuthUserUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthUserUseCase
});
