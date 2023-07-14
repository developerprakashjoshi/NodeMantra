"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = __importDefault(require("@controllers/job.controller"));
const validator_middleware_1 = __importDefault(require("@middlewares/validator.middleware"));
const job_validator_1 = require("@validators/job.validator");
const route = express_1.default.Router();
route.get('/datatable', job_controller_1.default.datatable);
route.get('/count', job_controller_1.default.count);
route.get('/', job_controller_1.default.getJobs);
route.get('/:id', job_controller_1.default.getJob);
route.post('/', (0, validator_middleware_1.default)(job_validator_1.createJob), job_controller_1.default.createJob);
route.patch('/:id', (0, validator_middleware_1.default)(job_validator_1.updateJob), job_controller_1.default.updateJob);
route.delete('/:id', (0, validator_middleware_1.default)(job_validator_1.deleteJob), job_controller_1.default.deleteJob);
exports.default = route;
