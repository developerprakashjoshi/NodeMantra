"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.createCompany = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCompany = joi_1.default.object({
    name: joi_1.default.string().required(),
    logo: joi_1.default.string().required(),
    size: joi_1.default.number().required(),
    industry: joi_1.default.string().required(),
    ceo: joi_1.default.string().required(),
    ceoAvatar: joi_1.default.string().required(),
    yearOfEstd: joi_1.default.number().required(),
    revenue: joi_1.default.number().required(),
    website: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    photos: joi_1.default.array().items(joi_1.default.string()).required(),
    createdBy: joi_1.default.number().required(),
    // created_by:Joi.number().required(),
}).options({ abortEarly: false });
exports.updateCompany = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().optional(),
    size: joi_1.default.string().optional(),
    industry: joi_1.default.string().optional(),
    ceo: joi_1.default.string().optional(),
    yearOfEstd: joi_1.default.number().optional(),
    revenue: joi_1.default.number().optional(),
    website: joi_1.default.string().optional(),
    opportunity: joi_1.default.string().optional(),
    // created_by:Joi.number().optional(),
}).options({ abortEarly: false });
exports.deleteCompany = joi_1.default.object({
    id: joi_1.default.string().required(),
    deleteBy: joi_1.default.number().required(),
});
