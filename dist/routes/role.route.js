"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_controller_1 = __importDefault(require("@controllers/role.controller"));
const validator_middleware_1 = __importDefault(require("@middlewares/validator.middleware"));
const role_validator_1 = require("@validators/role.validator");
const route = express_1.default.Router();
route.get('/search', role_controller_1.default.search);
route.get('/datatable', role_controller_1.default.datatable);
route.get('/count', role_controller_1.default.count);
route.get('/', role_controller_1.default.getRoles);
route.get('/:id', role_controller_1.default.getRole);
route.post('/', (0, validator_middleware_1.default)(role_validator_1.createRole), role_controller_1.default.createRole);
route.patch('/:id', (0, validator_middleware_1.default)(role_validator_1.updateRole), role_controller_1.default.updateRole);
route.delete('/:id', (0, validator_middleware_1.default)(role_validator_1.deleteRole), role_controller_1.default.deleteRole);
exports.default = route;
