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

// src/shared/provider/GenerateAuth.ts
var GenerateAuth_exports = {};
__export(GenerateAuth_exports, {
  GenerateAuth: () => GenerateAuth
});
module.exports = __toCommonJS(GenerateAuth_exports);
var import_jsonwebtoken = require("jsonwebtoken");
var GenerateAuth = class {
  static token({ email, name, id, avatar }) {
    const token = (0, import_jsonwebtoken.sign)(
      {
        email,
        name,
        id,
        avatar
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GenerateAuth
});
