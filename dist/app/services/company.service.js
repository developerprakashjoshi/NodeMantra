"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importDefault(require("@config/mongoose"));
const service_1 = __importDefault(require("@libs/service"));
const moment_1 = __importDefault(require("moment"));
const response_1 = __importDefault(require("@libs/response"));
const company_schema_1 = __importDefault(require("@models/company.schema"));
const AWS = __importStar(require("aws-sdk"));
const mongodb_1 = require("mongodb");
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
class CompanyService extends service_1.default {
    constructor() {
        super();
        this.companyModel = mongoose_1.default.model('Company');
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.companyModel.countDocuments({ deleted_at: { $eq: null } });
                return new response_1.default(true, 200, "Count operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield this.companyModel.find();
                return new response_1.default(true, 200, "Read operation successful", record);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    retrieve(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const record = yield this.companyModel.findById(pid);
                if (!record) {
                    return new response_1.default(false, 404, "Record not found");
                }
                return new response_1.default(true, 200, "Read operation successful", record);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    retrieveByCompany(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.companyModel.findOne({ where: { name: name } });
                return records;
            }
            catch (error) {
                return error;
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let company = new company_schema_1.default();
                company.name = data.name;
                company.logo = data.logo;
                company.size = data.size;
                company.industry = data.industry;
                company.yearOfEstd = data.company_size;
                company.revenue = data.profile;
                company.ceo = data.ceo;
                company.ceoAvatar = data.ceoAvatar;
                company.website = data.founded;
                company.description = data.description;
                company.location = data.location;
                company.photos = data.photos;
                company.createdAt = new Date();
                company.createdBy = data.created_by;
                company.createdFrom = '192.13.1.124';
                const result = yield company.save();
                return new response_1.default(true, 201, "Insert operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    update(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const company = yield this.companyModel.findById(pid);
                if (!company) {
                    return new response_1.default(true, 200, "Record not found");
                }
                if (data.name) {
                    company.name = data.name;
                }
                if (data.size) {
                    company.size = data.size;
                }
                if (data.ceo) {
                    company.ceo = data.ceo;
                }
                if (data.yearOfEstd) {
                    company.yearOfEstd = data.yearOfEstd;
                }
                if (data.revenue) {
                    company.revenue = data.profile;
                }
                if (data.revenue) {
                    company.revenue = data.revenue;
                }
                if (data.opportunity) {
                    company.opportunity = data.opportunity;
                }
                company.updatedAt = new Date();
                company.updatedBy = data.updatedBy;
                company.updatedFrom = '192.13.1.124';
                const result = yield company.save();
                return new response_1.default(true, 200, "Update operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    uploadCompanyLogo(pid, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const company = yield this.companyModel.findById(pid);
                company.logo = path;
                const result = yield company.save();
                return new response_1.default(true, 200, "Update operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    uploadCeoAvtar(pid, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const company = yield this.companyModel.findById(pid);
                company.ceoAvatar = path;
                const result = yield company.save();
                return new response_1.default(true, 200, "Update operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    uploadPhoto(pid, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const company = yield this.companyModel.findById(pid);
                company.photo = path;
                const result = yield company.save();
                return new response_1.default(true, 200, "Update operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    delete(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const company = yield this.companyModel.findOne(id);
                if (!company) {
                    return new response_1.default(true, 404, "Company not found", company);
                }
                company.deletedAt = (0, moment_1.default)().toDate(); // Set the deleted_at field to the current timestamp
                company.deleteBy = data.deleteBy;
                company.deleteFrom = '192.102.2.32';
                const result = yield company.save();
                return new response_1.default(true, 200, "Delete operation successful", company);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    datatable(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit, search, sort } = data;
                let errorMessage = '';
                if (page !== undefined && limit !== undefined) {
                    if (isNaN(page) || !Number.isInteger(Number(page)) || isNaN(limit) || !Number.isInteger(Number(limit))) {
                        errorMessage = "Both 'page' and 'limit' must be integers.";
                    }
                }
                else if (page !== undefined) {
                    if (isNaN(page) || !Number.isInteger(Number(page))) {
                        errorMessage = "'page' must be an integer.";
                    }
                }
                else if (limit !== undefined) {
                    if (isNaN(limit) || !Number.isInteger(Number(limit))) {
                        errorMessage = "'limit' must be an integer.";
                    }
                }
                if (errorMessage) {
                    return new response_1.default(false, 400, errorMessage);
                }
                let searchQuery = {};
                if (search !== undefined) {
                    searchQuery = {
                        $or: [
                            { name: { $regex: search, $options: 'i' } },
                            { size: { $regex: search, $options: 'i' } },
                            { location: { $regex: search, $options: 'i' } },
                        ],
                    };
                }
                let sortQuery = {};
                if (sort !== undefined) {
                    const sortParams = sort.split(':');
                    if (sortParams.length === 2) {
                        const [column, order] = sortParams;
                        sortQuery = { [column]: order === 'desc' ? -1 : 1 };
                    }
                }
                page = page === undefined ? 1 : parseInt(page);
                limit = limit === undefined ? 10 : parseInt(limit);
                const skip = (page - 1) * limit;
                const [records, totalCount] = yield Promise.all([
                    this.companyModel.find()
                        .select({
                        "logo": 1,
                        "name": 1,
                        "size": 1,
                        "industry": 1,
                        "location": 1,
                        "_id": 1
                    })
                        .where(searchQuery)
                        .sort(sortQuery)
                        .skip(skip)
                        .limit(limit),
                    this.companyModel.countDocuments(searchQuery),
                ]);
                if (records.length === 0) {
                    return new response_1.default(true, 200, 'No records available', {});
                }
                const totalPages = Math.ceil(totalCount / limit);
                const currentPage = page;
                const output = {
                    records: records,
                    totalPages: totalPages !== null ? totalPages : 0,
                    currentPage: currentPage !== null ? currentPage : 0,
                    filterCount: records.length,
                    totalCount: totalCount,
                };
                return new response_1.default(true, 200, 'Read operation successful', output);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
}
exports.default = CompanyService;
