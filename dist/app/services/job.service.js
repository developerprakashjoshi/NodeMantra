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
const service_1 = __importDefault(require("@libs/service"));
const moment_1 = __importDefault(require("moment"));
const response_1 = __importDefault(require("@libs/response"));
const job_schema_1 = __importDefault(require("@models/job.schema"));
const mongodb_1 = require("mongodb");
class JobService extends service_1.default {
    constructor() {
        super();
        this.jobModel = job_schema_1.default;
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.jobModel.countDocuments();
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
                const record = yield this.jobModel.find();
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
                const record = yield this.jobModel.findById(pid);
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
    retrieveByJob(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.jobModel.findOne({ where: { name: name } });
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
                let jobs = new job_schema_1.default();
                jobs.title = data.title;
                jobs.reportToWork = data.reportToWork;
                jobs.reportAddress = data.reportAddress;
                jobs.jobType = data.jobType;
                jobs.schedule = data.schedule;
                jobs.isStartPlanned = data.isStartPlanned;
                jobs.startDate = data.startDate;
                jobs.payRange = data.payRange;
                jobs.min = data.min;
                jobs.max = data.max;
                jobs.perMonth = data.perMonth;
                jobs.supplementalPay = data.supplementalPay;
                jobs.benefitsOffer = data.benefitsOffer;
                jobs.description = data.description;
                jobs.isCVRequired = data.isCVRequired;
                jobs.isDeadlineApplicable = data.isDeadlineApplicable;
                jobs.deadlineDate = data.deadlineDate;
                jobs.noOfHiring = data.noOfHiring;
                jobs.hiringSlot = data.hiringSlot;
                jobs.aboutCompany = data.aboutCompany;
                jobs.educationLevel = data.educationLevel;
                jobs.yearOfExperience = data.yearOfExperience;
                jobs.createdAt = new Date();
                jobs.createdBy = data.createdBy;
                jobs.createdFrom = '192.13.1.124';
                console.log("------");
                console.log(jobs);
                const result = yield jobs.save();
                console.log(result);
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
                const jobs = yield this.jobModel.findById(pid);
                if (!jobs) {
                    return new response_1.default(true, 404, "Record not found");
                }
                if (data.reportToWork) {
                    jobs.reportToWork = data.reportToWork;
                }
                if (data.title) {
                    jobs.title = data.title;
                }
                if (data.reportAddress) {
                    jobs.reportAddress = data.reportAddress;
                }
                if (data.jobType) {
                    jobs.jobType = data.jobType;
                }
                if (data.schedule) {
                    jobs.schedule = data.schedule;
                }
                if (data.isStartPlanned) {
                    jobs.isStartPlanned = data.isStartPlanned;
                }
                if (data.startDate) {
                    jobs.startDate = data.startDate;
                }
                if (data.payRange) {
                    jobs.payRange = data.payRange;
                }
                if (data.min) {
                    jobs.min = data.min;
                }
                if (data.max) {
                    jobs.max = data.max;
                }
                if (data.perMonth) {
                    jobs.perMonth = data.perMonth;
                }
                if (data.supplementalPay) {
                    jobs.supplementalPay = data.supplementalPay;
                }
                if (data.benefitsOffer) {
                    jobs.benefitsOffer = data.benefitsOffer;
                }
                if (data.description) {
                    jobs.description = data.description;
                }
                if (data.isCVRequired) {
                    jobs.isCVRequired = data.isCVRequired;
                }
                if (data.isDeadlineApplicable) {
                    jobs.isDeadlineApplicable = data.isDeadlineApplicable;
                }
                if (data.deadlineDate) {
                    jobs.deadlineDate = data.deadlineDate;
                }
                if (data.noOfHiring) {
                    jobs.noOfHiring = data.noOfHiring;
                }
                if (data.hiringSlot) {
                    jobs.hiringSlot = data.hiringSlot;
                }
                if (data.aboutCompany) {
                    jobs.aboutCompany = data.aboutCompany;
                }
                if (data.educationLevel) {
                    jobs.educationLevel = data.educationLevel;
                }
                if (data.yearOfExperience) {
                    jobs.yearOfExperience = data.yearOfExperience;
                }
                jobs.updatedAt = new Date();
                jobs.updatedBy = data.updatedBy;
                jobs.updatedFrom = '192.13.1.124';
                const result = yield jobs.save();
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
                const jobs = yield this.jobModel.findById(pid);
                if (!jobs) {
                    return new response_1.default(true, 404, "Jobs not found", jobs);
                }
                jobs.deletedAt = (0, moment_1.default)().toDate(); // Set the deleted_at field to the current timestamp
                jobs.deleteBy = data.deleteBy;
                jobs.deleteFrom = '192.102.2.32';
                const result = yield jobs.save(jobs);
                return new response_1.default(true, 200, "Delete operation successful", jobs);
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
                            { title: { $regex: search, $options: 'i' } },
                            { type: { $regex: search, $options: 'i' } },
                            { schedule: { $regex: search, $options: 'i' } },
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
                    this.jobModel.find()
                        .select({
                        "_id": 1,
                        "report_address": 1,
                        "type": 1,
                        "title": 1,
                        "noOfHiring": 1,
                        "schedule": 1,
                        "startDate": 1,
                        "isDeadlineApplicable": 1,
                        "createdAt": 1
                    })
                        .where(searchQuery)
                        .sort(sortQuery)
                        .skip(skip)
                        .limit(limit),
                    this.jobModel.countDocuments(searchQuery),
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
exports.default = JobService;
