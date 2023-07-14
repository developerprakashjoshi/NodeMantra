"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storage_controller_1 = __importDefault(require("@controllers/storage.controller"));
const multer_1 = __importDefault(require("multer"));
const route = express_1.default.Router();
// Define file upload storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
route.get('/datatable', storage_controller_1.default.datatable);
route.get('/count', storage_controller_1.default.count);
route.get('/', storage_controller_1.default.getStorages);
route.get('/:id', storage_controller_1.default.getStorage);
route.get('/:fileName', storage_controller_1.default.getStorageByFilename);
route.post('/', upload.single('file'), storage_controller_1.default.upload);
route.patch('/:id', upload.single('file'), storage_controller_1.default.update);
route.delete('/:id', storage_controller_1.default.delete);
exports.default = route;
