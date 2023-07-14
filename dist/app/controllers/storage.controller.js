"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_service_1 = __importDefault(require("@services/storage.service"));
const controller_1 = __importDefault(require("@libs/controller"));
class RoleController extends controller_1.default {
    static count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let storageService = new storage_service_1.default();
            const result = yield storageService.count();
            res.status(result.statusCode).json(result);
        });
    }
    static getStorages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let storageService = new storage_service_1.default();
            const record = yield storageService.list();
            res.status(record.statusCode).json(record);
        });
    }
    static getStorage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let storageService = new storage_service_1.default();
            const records = yield storageService.retrieve(id);
            res.status(records.statusCode).json(records);
        });
    }
    static getStorageByFilename(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = req.params.fileName;
            let storageService = new storage_service_1.default();
            const records = yield storageService.retrieveByFilename(fileName);
            res.status(records.statusCode).json(records);
        });
    }
    static upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            let storageService = new storage_service_1.default();
            const result = yield storageService.create(file, 'document');
            res.status(result.statusCode).json(result);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let storageService = new storage_service_1.default();
            const result = yield storageService.delete(id);
            res.status(result.statusCode).json(result);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const file = req.file;
            let storageService = new storage_service_1.default();
            const result = yield storageService.update(id, file);
            res.status(result.statusCode).json(result);
        });
    }
    static datatable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let storageService = new storage_service_1.default();
            const records = yield storageService.datatable();
            res.status(records.statusCode).json(records);
        });
    }
}
exports.default = RoleController;
