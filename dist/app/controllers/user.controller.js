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
const user_service_1 = __importDefault(require("@services/user.service"));
const storage_service_1 = __importDefault(require("@services/storage.service"));
const controller_1 = __importDefault(require("@libs/controller"));
class UserController extends controller_1.default {
    static count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userService = new user_service_1.default();
            const result = yield userService.count();
            res.status(result.statusCode).json(result);
        });
    }
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userService = new user_service_1.default();
            const record = yield userService.list();
            res.status(record.statusCode).json(record);
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let userService = new user_service_1.default();
            const records = yield userService.retrieve(id);
            res.status(records.statusCode).json(records);
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            let userService = new user_service_1.default();
            const result = yield userService.create(data);
            res.status(result.statusCode).json(result);
        });
    }
    static uploadCurriculumVitae(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            let storageService = new storage_service_1.default();
            const result = yield storageService.create(file, 'document');
            console.log(result);
            const path = result.data.path;
            let userService = new user_service_1.default();
            const id = req.params.id;
            const user = yield userService.updateCurriculumVitae(id, path);
            res.status(user.statusCode).json(user);
        });
    }
    static uploadCertificate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            let storageService = new storage_service_1.default();
            const result = yield storageService.create(file, 'document');
            const path = result.data.path;
            let userService = new user_service_1.default();
            const id = req.params.id;
            const user = yield userService.updateCertificate(id, path);
            res.status(user.statusCode).json(user);
        });
    }
    static uploadAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            let storageService = new storage_service_1.default();
            const result = yield storageService.create(file, 'document');
            const path = result.data.path;
            let userService = new user_service_1.default();
            const id = req.params.id;
            const user = yield userService.updateAvatar(id, path);
            res.status(user.statusCode).json(user);
        });
    }
    static updateBasicInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let userService = new user_service_1.default();
            const result = yield userService.updateBasicInfo(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let userService = new user_service_1.default();
            const result = yield userService.updateAddress(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static updateEducation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let userService = new user_service_1.default();
            const result = yield userService.updateEducation(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static updateWorkExperience(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let userService = new user_service_1.default();
            const result = yield userService.updateWorkExperience(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static updateSkillSets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let userService = new user_service_1.default();
            const result = yield userService.updateSkillSets(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static updateConfirmStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let userService = new user_service_1.default();
            const result = yield userService.updateConfirmStatus(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let userService = new user_service_1.default();
            const result = yield userService.update(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let userService = new user_service_1.default();
            const result = yield userService.delete(id);
            res.status(result.statusCode).json(result);
        });
    }
    static datatable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.query;
            let userService = new user_service_1.default();
            const records = yield userService.datatable(data);
            res.status(records.statusCode).json(records);
        });
    }
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query.q;
            let userService = new user_service_1.default();
            const results = yield userService.searchUsers(query);
            res.status(results.statusCode).json(results);
        });
    }
}
exports.default = UserController;
