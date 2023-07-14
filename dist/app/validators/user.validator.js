"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.updateConfirmStatus = exports.updateSkillSets = exports.updateExperience = exports.updateEducation = exports.updateAddress = exports.updateBasicInfo = exports.registerUser = exports.createCertificate = exports.createExperience = exports.createEducation = exports.createAddress = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createAddress = joi_1.default.object({
    street: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    postalCode: joi_1.default.number().required(),
    type: joi_1.default.string().valid('home', 'office').required()
}).options({ abortEarly: false });
;
exports.createEducation = joi_1.default.object({
    level: joi_1.default.string().required(),
    fieldStudy: joi_1.default.string().required(),
    schoolName: joi_1.default.string().required(),
    board: joi_1.default.string().required(),
    passingYear: joi_1.default.number().required(),
    state: joi_1.default.string().required(),
    city: joi_1.default.string().required()
}).options({ abortEarly: false });
exports.createExperience = joi_1.default.object({
    jobTitle: joi_1.default.string().required(),
    companyName: joi_1.default.string().required(),
    currentlyWorking: joi_1.default.boolean().required(),
    fromMonth: joi_1.default.string().required(),
    fromYear: joi_1.default.string().required(),
    toMonth: joi_1.default.string().required(),
    toYear: joi_1.default.string().required(),
    description: joi_1.default.string().required()
}).options({ abortEarly: false });
exports.createCertificate = joi_1.default.object({
    file: joi_1.default.string().required()
}).options({ abortEarly: false });
;
exports.registerUser = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    termsConditions: joi_1.default.boolean().valid(true).required(),
    type: joi_1.default.string().valid('student').required(),
}).options({ abortEarly: false });
exports.updateBasicInfo = joi_1.default.object({
    id: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phoneNo: joi_1.default.number().optional(),
}).options({ abortEarly: false });
exports.updateAddress = joi_1.default.object({
    id: joi_1.default.string().required(),
    street: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    postalCode: joi_1.default.number().required(),
    type: joi_1.default.string().valid('home', 'office').required()
}).options({ abortEarly: false });
exports.updateEducation = joi_1.default.object({
    id: joi_1.default.string().required(),
    level: joi_1.default.string().required(),
    fieldStudy: joi_1.default.string().required(),
    schoolName: joi_1.default.string().required(),
    board: joi_1.default.string().required(),
    passingYear: joi_1.default.number().required(),
    state: joi_1.default.string().required(),
    city: joi_1.default.string().required()
}).options({ abortEarly: false });
exports.updateExperience = joi_1.default.object({
    id: joi_1.default.string().required(),
    jobTitle: joi_1.default.string().required(),
    companyName: joi_1.default.string().required(),
    currentlyWorking: joi_1.default.boolean().required(),
    fromMonth: joi_1.default.string().required(),
    fromYear: joi_1.default.number().required(),
    toMonth: joi_1.default.string().required(),
    toYear: joi_1.default.number().required(),
    description: joi_1.default.string().required()
}).options({ abortEarly: false });
exports.updateSkillSets = joi_1.default.object({
    id: joi_1.default.string().required(),
    skillSets: joi_1.default.string().required(),
    recommendationSets: joi_1.default.string().required(),
}).options({ abortEarly: false });
exports.updateConfirmStatus = joi_1.default.object({
    id: joi_1.default.string().required()
}).options({ abortEarly: false });
exports.createUser = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    termsConditions: joi_1.default.boolean().required(),
    curriculumVitae: joi_1.default.string().required(),
    phoneNo: joi_1.default.number().required(),
    addresses: joi_1.default.array().items(exports.createAddress).required(),
    education: joi_1.default.array().items(exports.createEducation).required(),
    experiences: joi_1.default.array().items(exports.createExperience).required(),
    skillSets: joi_1.default.string().required(),
    recommendationSets: joi_1.default.string().required(),
    certificates: joi_1.default.array().items(exports.createCertificate).required(),
    isReady: joi_1.default.boolean().required()
}).options({ abortEarly: false });
