"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CompanySchema = new mongoose_1.Schema({
    name: { type: String },
    size: { type: Number },
    industry: { type: String },
    ceo: { type: String },
    yearOfEstd: { type: Number },
    revenue: { type: Number },
    website: { type: String },
    logo: { type: String },
    ceoAvatar: { type: String },
    description: { type: String },
    location: { type: String },
    photos: [{ type: String }],
    createdAt: { type: Date },
    createdBy: { type: Number },
    createdFrom: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: Number },
    updateFrom: { type: String },
    deletedAt: { type: Date },
    deleteBy: { type: Number },
    deleteFrom: { type: String },
});
const Company = (0, mongoose_1.model)('Company', CompanySchema);
exports.default = Company;
