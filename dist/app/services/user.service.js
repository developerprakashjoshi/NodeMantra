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
const response_1 = __importDefault(require("@libs/response"));
const user_schema_1 = __importDefault(require("@models/user.schema"));
const meili_search_1 = __importDefault(require("@libs/meili.search"));
const mongodb_1 = require("mongodb");
const moment_1 = __importDefault(require("moment"));
class UserService extends service_1.default {
    constructor() {
        super();
        this.searchEngine = new meili_search_1.default();
        this.userModel = user_schema_1.default;
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userModel.countDocuments();
                if (!result) {
                    return new response_1.default(true, 200, 'Record not available', result);
                }
                return new response_1.default(true, 200, 'Count operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userModel.find();
                if (!result) {
                    return new response_1.default(true, 200, 'Record not available', result);
                }
                return new response_1.default(true, 200, 'Read operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    retrieve(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, 'Invalid ObjectId', undefined);
                }
                const record = yield this.userModel.findById(pid);
                if (!record) {
                    return new response_1.default(true, 200, 'Record not available', record);
                }
                return new response_1.default(true, 200, 'Read operation successful', record);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    retrieveByUser(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.userModel.findOne({ name: name });
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
                const user = new user_schema_1.default();
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.password = data.password;
                user.termsConditions = data.termsConditions;
                user.type = data.type;
                user.onboardingStep = 1;
                // await this.searchEngine.addDocuments('user', user);
                const result = yield user.save();
                return new response_1.default(true, 201, 'Insert operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    updateCurriculumVitae(pid, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const user = yield this.userModel.findById(pid);
                user.curriculumVitae = path;
                user.onboardingStep = 2;
                const result = yield user.save();
                return new response_1.default(true, 200, "Update operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    updateCertificate(pid, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const user = yield this.userModel.findById(pid);
                const certificate = { file: path };
                user.certificates.push(certificate);
                user.onboardingStep = 6;
                const result = yield user.save();
                return new response_1.default(true, 200, "Update operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    updateAvatar(pid, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const users = yield this.userModel.findById(pid);
                users.avatar = path;
                const result = yield users.save();
                return new response_1.default(true, 200, "Update operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 400, error.message);
            }
        });
    }
    updateBasicInfo(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, 'Invalid ObjectId', undefined);
                }
                const user = yield this.userModel.findById(pid);
                if (!user) {
                    return new response_1.default(true, 200, 'Record not available', user);
                }
                if (data.firstName) {
                    user.firstName = data.firstName;
                }
                if (data.lastName) {
                    user.lastName = data.lastName;
                }
                if (data.email) {
                    user.email = data.email;
                }
                if (data.phoneNo) {
                    user.phoneNo = data.phoneNo;
                }
                user.onboardingStep = 3;
                // await this.searchEngine.updateIndex('user', user);
                const result = yield user.save();
                return new response_1.default(true, 200, 'Update operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    updateAddress(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, 'Invalid ObjectId', undefined);
                }
                const user = yield this.userModel.findById(pid);
                if (!user) {
                    return new response_1.default(true, 200, 'Record not available', user);
                }
                if (!user.address) {
                    user.address = [];
                }
                const address = {
                    street: "",
                    country: "",
                    state: "",
                    city: "",
                    postalCode: 0,
                    type: ""
                };
                if (data.street) {
                    address.street = data.street;
                }
                if (data.country) {
                    address.country = data.country;
                }
                if (data.state) {
                    address.state = data.state;
                }
                if (data.city) {
                    address.city = data.city;
                }
                if (data.postalCode) {
                    address.postalCode = data.postalCode;
                }
                if (data.type) {
                    address.type = data.type;
                }
                user.onboardingStep = 3;
                user.addresses.push(address);
                // await this.searchEngine.updateIndex('user', user);
                const result = yield user.save();
                return new response_1.default(true, 200, 'Update operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    updateEducation(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, 'Invalid ObjectId', undefined);
                }
                const user = yield this.userModel.findById(pid);
                if (!user) {
                    return new response_1.default(true, 200, 'Record not available', user);
                }
                if (!user.education) {
                    user.education = [];
                }
                const education = {
                    level: "",
                    fieldStudy: "",
                    schoolName: "",
                    board: "",
                    passingYear: 0,
                    state: "",
                    city: "",
                };
                if (data.level) {
                    education.level = data.level;
                }
                if (data.country) {
                    education.fieldStudy = data.fieldStudy;
                }
                if (data.schoolName) {
                    education.schoolName = data.schoolName;
                }
                if (data.board) {
                    education.board = data.board;
                }
                if (data.passingYear) {
                    education.passingYear = data.passingYear;
                }
                if (data.state) {
                    education.state = data.state;
                }
                if (data.state) {
                    education.state = data.state;
                }
                user.onboardingStep = 4;
                user.education.push(education);
                // await this.searchEngine.updateIndex('user', user);
                const result = yield user.save();
                return new response_1.default(true, 200, 'Update operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    updateWorkExperience(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, 'Invalid ObjectId', undefined);
                }
                const user = yield this.userModel.findById(pid);
                if (!user) {
                    return new response_1.default(true, 200, 'Record not available', user);
                }
                if (!user.experience) {
                    user.experience = [];
                }
                const experience = {
                    jobTitle: "",
                    companyName: "",
                    currentlyWorking: false,
                    fromMonth: "",
                    fromYear: "",
                    toMonth: "",
                    toYear: "",
                    description: ""
                };
                if (data.jobTitle) {
                    experience.jobTitle = data.jobTitle;
                }
                if (data.companyName) {
                    experience.companyName = data.companyName;
                }
                if (data.currentlyWorking) {
                    experience.currentlyWorking = data.currentlyWorking;
                }
                if (data.fromMonth) {
                    experience.fromMonth = data.fromMonth;
                }
                if (data.fromYear) {
                    experience.fromYear = data.fromYear;
                }
                if (data.toMonth) {
                    experience.toMonth = data.toMonth;
                }
                if (data.fromMonth) {
                    experience.fromMonth = data.fromMonth;
                }
                if (data.description) {
                    experience.description = data.description;
                }
                user.experiences.push(experience);
                user.onboardingStep = 5;
                // await this.searchEngine.updateIndex('user', user);
                const result = yield user.save();
                return new response_1.default(true, 200, 'Update operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    updateSkillSets(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, 'Invalid ObjectId', undefined);
                }
                const user = yield this.userModel.findById(pid);
                if (!user) {
                    return new response_1.default(true, 200, 'Record not available', user);
                }
                if (data.skillSets) {
                    user.skillSets = data.skillSets;
                }
                if (data.recommendationSets) {
                    user.recommendationSets = data.recommendationSets;
                }
                user.onboardingStep = 6;
                // await this.searchEngine.updateIndex('user', user);
                const result = yield user.save();
                return new response_1.default(true, 200, 'Update operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    updateConfirmStatus(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, 'Invalid ObjectId', undefined);
                }
                const user = yield this.userModel.findById(pid);
                if (!user) {
                    return new response_1.default(true, 200, 'Record not available', user);
                }
                user.isReady = true;
                user.onboardingStep = 7;
                // await this.searchEngine.updateIndex('user', user);
                const result = yield user.save();
                return new response_1.default(true, 200, 'Update operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    update(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, 'Invalid ObjectId', undefined);
                }
                const user = yield this.userModel.findById(pid);
                if (!user) {
                    return new response_1.default(true, 200, 'Record not available', user);
                }
                if (data.name) {
                    user.name = data.name;
                }
                if (data.description) {
                    user.description = data.description;
                }
                if (data.status) {
                    user.status = data.status;
                }
                yield this.searchEngine.updateIndex('user', user);
                const result = yield user.save();
                return new response_1.default(true, 200, 'Update operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
            }
        });
    }
    delete(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, 'Invalid ObjectId', undefined);
                }
                const user = yield this.userModel.findById(pid);
                if (!user) {
                    return new response_1.default(true, 200, 'Record not available');
                }
                user.deletedAt = (0, moment_1.default)().toDate();
                // await this.searchEngine.deleteDocument('user', pid);
                const result = yield user.save();
                return new response_1.default(true, 200, 'Delete operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Internal Server Error', undefined, undefined, error.message);
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
                            { firstName: { $regex: search, $options: 'i' } },
                            { lastName: { $regex: search, $options: 'i' } },
                            { email: { $regex: search, $options: 'i' } },
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
                    this.userModel.aggregate([
                        {
                            $match: {
                                $and: [
                                    searchQuery,
                                    { deletedAt: null } // Filter out documents where deletedAt is not null
                                ]
                            }
                        },
                        ...(Object.keys(sortQuery).length > 0 ? [{ $sort: sortQuery }] : []),
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        },
                        {
                            $addFields: {
                                fullName: { $concat: ["$firstName", " ", "$lastName"] },
                                designation: "",
                                appliedFor: "",
                                interviewSchedule: true,
                                jobStatus: "Accepted",
                                city: {
                                    $ifNull: [
                                        { $arrayElemAt: ["$addresses.city", { $subtract: [{ $size: "$addresses" }, 1] }] },
                                        ""
                                    ]
                                },
                                experience: {
                                    $subtract: [
                                        {
                                            $toInt: {
                                                $cond: [
                                                    { $and: [{ $ne: [{ $arrayElemAt: ["$experiences.toYear", 0] }, ""] }, { $ne: [{ $arrayElemAt: ["$experiences.toYear", 0] }, null] }] },
                                                    { $arrayElemAt: ["$experiences.toYear", 0] },
                                                    0
                                                ]
                                            }
                                        },
                                        {
                                            $toInt: {
                                                $cond: [
                                                    { $and: [{ $ne: [{ $arrayElemAt: ["$experiences.fromYear", 0] }, ""] }, { $ne: [{ $arrayElemAt: ["$experiences.fromYear", 0] }, null] }] },
                                                    { $arrayElemAt: ["$experiences.fromYear", 0] },
                                                    0
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                firstName: 1,
                                lastName: 1,
                                fullName: 1,
                                email: 1,
                                phoneNo: 1,
                                curriculumVitae: 1,
                                designation: 1,
                                city: 1,
                                experience: 1,
                                appliedFor: 1,
                                interviewSchedule: 1,
                                jobStatus: 1,
                            }
                        }
                    ])
                        .exec(),
                    this.userModel.countDocuments(searchQuery),
                ]);
                console.log(records, totalCount);
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
    searchUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchOptions = {
                    filters: `name:${query}*`,
                    attributesToRetrieve: ['name'], // Specify the column(s) to retrieve in the search results
                };
                const result = yield this.searchEngine.search('user', query, searchOptions);
                return new response_1.default(true, 200, 'Search engine operation successful', result);
            }
            catch (error) {
                return new response_1.default(false, 500, 'Search engine server error', undefined, undefined, error.message);
            }
        });
    }
}
exports.default = UserService;
