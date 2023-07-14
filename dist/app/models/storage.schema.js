"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StorageSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
});
const StorageModel = (0, mongoose_1.model)("Storage", StorageSchema);
exports.default = StorageModel;
