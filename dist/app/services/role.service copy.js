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
const database_1 = __importDefault(require("@config/database"));
const service_1 = __importDefault(require("@libs/service"));
const response_1 = __importDefault(require("@libs/response"));
const role_schema_1 = __importDefault(require("@models/role.schema"));
const mongodb_1 = require("mongodb");
const moment_1 = __importDefault(require("moment"));
// import { User } from '@models/user.schema'
// import { Post } from '@models/post.schema'
class RoleService extends service_1.default {
    constructor() {
        super();
        this.roleRepository = database_1.default.getRepository(role_schema_1.default);
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.roleRepository.count();
                if (!result) {
                    return new response_1.default(true, 200, "Record not available", result);
                }
                return new response_1.default(true, 200, "Count operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.roleRepository.find();
                if (!result) {
                    return new response_1.default(true, 200, "Record not available", result);
                }
                return new response_1.default(true, 200, "Read operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
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
                const record = yield this.roleRepository.findOne(id);
                if (!record) {
                    return new response_1.default(true, 200, "Record not available", record);
                }
                return new response_1.default(true, 200, "Read operation successful", record);
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
    retrieveByRole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.roleRepository.findOne({ where: { name: name } });
                return records;
            }
            catch (error) {
                return error;
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = database_1.default.manager;
            try {
                // Create instances of User and Post
                // const user = new User();
                // user.name = 'John Doe';
                // user.age = 30;
                // const post = new Post();
                // post.title = 'TypeORM is awesome!';
                // post.content = 'Learn how to use TypeORM with MongoDB.';
                // post.author = user;
                // await entityManager.save([user, post]);
                // const result = [user, post];
                // let role: Role = new Role()
                // role.name = data.name
                // role.description = data.description
                // role.status = data.status
                // role.createdAt=moment().toDate()
                // role.updatedAt=moment().toDate()
                // const result = await this.roleRepository.save(role)
                // delete result.createdAt;
                // delete result.updatedAt;
                // delete result.deletedAt;
                return new response_1.default(true, 201, "Insert operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
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
                const role = yield this.roleRepository.findOneBy(id);
                if (!role) {
                    return new response_1.default(true, 200, "Record not available", role);
                }
                if (data.name) {
                    role.name = data.name;
                }
                if (data.description) {
                    role.description = data.description;
                }
                if (data.status) {
                    role.status = data.status;
                }
                const result = yield this.roleRepository.save(role);
                delete result.createdAt;
                delete result.updatedAt;
                delete result.deletedAt;
                return new response_1.default(true, 200, "Update operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
    delete(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const role = yield this.roleRepository.findOne(id);
                if (!role) {
                    return new response_1.default(true, 200, "Record not available");
                }
                role.deleted_at = (0, moment_1.default)().toDate();
                const result = yield this.roleRepository.save(role);
                delete result.createdAt;
                delete result.updatedAt;
                delete result.deletedAt;
                return new response_1.default(true, 200, "Delete operation successful", result);
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
    datatable(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, limit, search, sort } = data;
                let errorMessage = "";
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
                            { name: { $regex: search, $options: "i" } },
                            { description: { $regex: search, $options: "i" } },
                        ],
                    };
                }
                let sortQuery = {};
                if (sort !== undefined) {
                    const sortParams = sort.split(":");
                    if (sortParams.length === 2) {
                        const [column, order] = sortParams;
                        sortQuery = { [column]: order === "desc" ? -1 : 1 };
                    }
                }
                page = page === undefined ? 1 : parseInt(page);
                limit = limit === undefined ? 10 : parseInt(limit);
                const skip = (page - 1) * limit;
                let columns = ["name", "description", "status"];
                const [records, totalCount] = yield Promise.all([
                    this.roleRepository.find({
                        select: columns,
                        where: searchQuery,
                        order: sortQuery,
                        skip: skip,
                        take: limit,
                    }),
                    this.roleRepository.count(),
                ]);
                if (records.length === 0) {
                    return new response_1.default(true, 200, "No records available", {});
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
                return new response_1.default(true, 200, "Read operation successful", output);
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
}
exports.default = RoleService;
