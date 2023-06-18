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

// src/shared/provider/DiskStorage.ts
var DiskStorage_exports = {};
__export(DiskStorage_exports, {
  DiskStorage: () => DiskStorage
});
module.exports = __toCommonJS(DiskStorage_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiskStorage
});