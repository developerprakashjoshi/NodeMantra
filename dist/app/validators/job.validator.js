"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.createJob = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createJob = joi_1.default.object({
    title: joi_1.default.string().required(),
    reportToWork: joi_1.default.number().required(),
    reportAddress: joi_1.default.string().required(),
    jobType: joi_1.default.string().required(),
    schedule: joi_1.default.string().required(),
    isStartPlanned: joi_1.default.number().required(),
    startDate: joi_1.default.date().required(),
    payRange: joi_1.default.string().required(),
    min: joi_1.default.string().required(),
    max: joi_1.default.string().required(),
    perMonth: joi_1.default.string().required(),
    supplementalPay: joi_1.default.string().required(),
    benefitsOffer: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    isCVRequired: joi_1.default.boolean().required(),
    isDeadlineApplicable: joi_1.default.boolean().required(),
    deadlineDate: joi_1.default.date().required(),
    noOfHiring: joi_1.default.number().required(),
    hiringSlot: joi_1.default.string().required(),
    aboutCompany: joi_1.default.string().required(),
    educationLevel: joi_1.default.number().required(),
    yearOfExperience: joi_1.default.number().required(),
    createdBy: joi_1.default.number().required(),
    status: joi_1.default.number().required(),
}).options({ abortEarly: false });
exports.updateJob = joi_1.default.object({
    id: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    reportToWork: joi_1.default.number().optional(),
    reportAddress: joi_1.default.string().optional(),
    jobType: joi_1.default.string().optional(),
    schedule: joi_1.default.string().optional(),
    isStartPlanned: joi_1.default.number().optional(),
    startDate: joi_1.default.date().optional(),
    payRange: joi_1.default.string().optional(),
    min: joi_1.default.string().optional(),
    max: joi_1.default.string().optional(),
    perMonth: joi_1.default.string().optional(),
    supplementalPay: joi_1.default.string().optional(),
    benefitsOffer: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    isCVRequired: joi_1.default.boolean().optional(),
    isDeadlineApplicable: joi_1.default.boolean().optional(),
    deadlineDate: joi_1.default.date().optional(),
    noOfHiring: joi_1.default.number().optional(),
    hiringSlot: joi_1.default.string().optional(),
    aboutCompany: joi_1.default.string().optional(),
    educationLevel: joi_1.default.number().optional(),
    yearOfExperience: joi_1.default.number().optional(),
    updatedBy: joi_1.default.number().required(),
}).options({ abortEarly: false });
exports.deleteJob = joi_1.default.object({
    id: joi_1.default.string().required(),
    delete_by: joi_1.default.number().required()
});
