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
const role_service_1 = __importDefault(require("@services/role.service"));
const controller_1 = __importDefault(require("@libs/controller"));
class RoleController extends controller_1.default {
    static count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleService = new role_service_1.default();
            const result = yield roleService.count();
            res.status(result.statusCode).json(result);
        });
    }
    static getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleService = new role_service_1.default();
            const record = yield roleService.list();
            res.status(record.statusCode).json(record);
        });
    }
    static getRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let roleService = new role_service_1.default();
            const records = yield roleService.retrieve(id);
            res.status(records.statusCode).json(records);
        });
    }
    static createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            let roleService = new role_service_1.default();
            const result = yield roleService.create(data);
            res.status(result.statusCode).json(result);
        });
    }
    static updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let roleService = new role_service_1.default();
            const result = yield roleService.update(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let roleService = new role_service_1.default();
            const result = yield roleService.delete(id);
            res.status(result.statusCode).json(result);
        });
    }
    static datatable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.query;
            let roleService = new role_service_1.default();
            const records = yield roleService.datatable(data);
            res.status(records.statusCode).json(records);
        });
    }
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query.q;
            let roleService = new role_service_1.default();
            const results = yield roleService.searchRoles(query);
            res.status(results.statusCode).json(results);
        });
    }
}
exports.default = RoleController;
