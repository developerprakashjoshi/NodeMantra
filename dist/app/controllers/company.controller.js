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
const company_service_1 = __importDefault(require("@services/company.service"));
const controller_1 = __importDefault(require("@libs/controller"));
const storage_service_1 = __importDefault(require("@services/storage.service"));
class CompanyController extends controller_1.default {
    static count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let companyService = new company_service_1.default();
            const result = yield companyService.count();
            res.status(result.statusCode).json(result);
        });
    }
    static getCompanies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let companyService = new company_service_1.default();
            const record = yield companyService.list();
            res.status(record.statusCode).json(record);
        });
    }
    static getCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let companyService = new company_service_1.default();
            const records = yield companyService.retrieve(id);
            res.status(records.statusCode).json(records);
        });
    }
    static createCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            let companyService = new company_service_1.default();
            const result = yield companyService.create(data);
            res.status(result.statusCode).json(result);
        });
    }
    static uploadCompanyLogo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            let storageService = new storage_service_1.default();
            const result = yield storageService.create(file, 'document');
            const path = result.data.path;
            let companyService = new company_service_1.default();
            const id = req.params.id;
            const company = yield companyService.uploadCompanyLogo(id, path);
            res.status(company.statusCode).json(company);
        });
    }
    static uploadCeoAvtar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            let storageService = new storage_service_1.default();
            const result = yield storageService.create(file, 'document');
            const path = result.data.path;
            let companyService = new company_service_1.default();
            const id = req.params.id;
            const company = yield companyService.uploadCeoAvtar(id, path);
            res.status(company.statusCode).json(company);
        });
    }
    static uploadPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            let storageService = new storage_service_1.default();
            const result = yield storageService.create(file, 'document');
            const path = result.data.path;
            let companyService = new company_service_1.default();
            const id = req.params.id;
            const company = yield companyService.uploadPhoto(id, path);
            res.status(company.statusCode).json(company);
        });
    }
    static updateCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let companyService = new company_service_1.default();
            const result = yield companyService.update(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static deleteCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const data = req.body;
            let companyService = new company_service_1.default();
            const result = yield companyService.delete(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static datatable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.query;
            let companyService = new company_service_1.default();
            const records = yield companyService.datatable(data);
            res.status(records.statusCode).json(records);
        });
    }
}
exports.default = CompanyController;
