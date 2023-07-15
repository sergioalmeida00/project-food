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

// src/modules/user/useCase/create-user/create-user-controller.ts
var create_user_controller_exports = {};
__export(create_user_controller_exports, {
  CreateUserController: () => CreateUserController
});
module.exports = __toCommonJS(create_user_controller_exports);
var import_tsyringe2 = require("tsyringe");

// src/modules/user/useCase/create-user/create-user-useCase.ts
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

// src/modules/user/useCase/create-user/create-user-useCase.ts
var CreateUserUseCase = class {
  constructor(useRepository) {
    this.useRepository = useRepository;
  }
  async execute({ name, email, password, avatar }) {
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
    if (emailExists && emailExists.password) {
      throw new AppError("e-mail j\xE1 cadastrado");
    }
    if (emailExists && !emailExists.password) {
      throw new AppError("e-mail j\xE1 associado a uma conta do Google", 404);
    }
    const resultUser = await this.useRepository.create({
      name,
      email,
      password: passwordHash,
      avatar
    });
    const data = GenerateAuth.token({
      email,
      name,
      id: resultUser.id
    });
    return {
      ...data,
      avatar: resultUser.avatar
    };
  }
};
CreateUserUseCase = __decorateClass([
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("KnexUserRepository"))
], CreateUserUseCase);

// src/modules/user/useCase/create-user/create-user-controller.ts
var CreateUserController = class {
  async handle(request, response) {
    const { name, email, password, avatar } = request.body;
    const createUserUseCase = import_tsyringe2.container.resolve(CreateUserUseCase);
    try {
      const resultUser = await createUserUseCase.execute({
        name,
        email,
        password,
        avatar
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserController
});
