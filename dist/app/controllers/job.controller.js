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
const job_service_1 = __importDefault(require("@services/job.service"));
const controller_1 = __importDefault(require("@libs/controller"));
class JobController extends controller_1.default {
    static count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let jobService = new job_service_1.default();
            const result = yield jobService.count();
            res.status(result.statusCode).json(result);
        });
    }
    static getJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let jobService = new job_service_1.default();
            const record = yield jobService.list();
            res.status(record.statusCode).json(record);
        });
    }
    static getJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let jobService = new job_service_1.default();
            const records = yield jobService.retrieve(id);
            res.status(records.statusCode).json(records);
        });
    }
    static createJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            let jobService = new job_service_1.default();
            const result = yield jobService.create(data);
            res.status(result.statusCode).json(result);
        });
    }
    static updateJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let jobService = new job_service_1.default();
            const result = yield jobService.update(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static deleteJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const data = req.body;
            let jobService = new job_service_1.default();
            const result = yield jobService.delete(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static datatable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.query;
            let jobService = new job_service_1.default();
            const records = yield jobService.datatable(data);
            res.status(records.statusCode).json(records);
        });
    }
}
exports.default = JobController;
