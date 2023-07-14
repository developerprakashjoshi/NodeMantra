"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.createRole = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createRole = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    status: joi_1.default.number().required(),
}).options({ abortEarly: false });
exports.updateRole = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    status: joi_1.default.number().optional(),
}).options({ abortEarly: false });
exports.deleteRole = joi_1.default.object({
    id: joi_1.default.string().required(),
});
