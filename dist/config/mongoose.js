"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the connection URI
const uri = `mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
// Set up the Mongoose connection
mongoose_1.default.connect(uri);
const AppDataSource = mongoose_1.default.connection;
exports.default = AppDataSource;
