"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const addressSchema = new mongoose_1.Schema({
    street: String,
    country: String,
    state: String,
    city: String,
    postalCode: Number,
    type: String,
});
const educationSchema = new mongoose_1.Schema({
    level: String,
    fieldStudy: String,
    schoolName: String,
    board: String,
    passingYear: Number,
    state: String,
    city: String,
});
const experienceSchema = new mongoose_1.Schema({
    jobTitle: String,
    companyName: String,
    currentlyWorking: Boolean,
    fromMonth: String,
    fromYear: String,
    toMonth: String,
    toYear: String,
    description: String,
});
const certificateSchema = new mongoose_1.Schema({
    file: String,
});
const userSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    termsConditions: Boolean,
    curriculumVitae: String,
    phoneNo: Number,
    addresses: [addressSchema],
    education: [educationSchema],
    experiences: [experienceSchema],
    skillSets: String,
    recommendationSets: String,
    certificates: [certificateSchema],
    isReady: Boolean,
    type: String,
    onboardingStep: Number,
    avatar: String,
    deletedAt: Date,
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
