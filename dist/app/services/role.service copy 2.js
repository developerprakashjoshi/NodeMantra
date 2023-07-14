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
const role_schema_1 = __importDefault(require("@models/role.schema"));
const user_schema_1 = __importDefault(require("@models/user.schema"));
const post_schema_1 = __importDefault(require("@models/post.schema"));
const mongodb_1 = require("mongodb");
const moment_1 = __importDefault(require("moment"));
class RoleService extends service_1.default {
    constructor() {
        super();
        this.roleModel = role_schema_1.default;
        this.userModel = user_schema_1.default;
        this.postModel = post_schema_1.default;
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.roleModel.countDocuments();
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
                const result = yield this.roleModel.find();
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
                const record = yield this.roleModel.findById(pid);
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
    retrieveByRole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.roleModel.findOne({ name: name });
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
                // const role = new Role();
                // role.name = data.name
                // role.description =data.description
                // role.status= data.status
                // role.createdAt=moment().toDate()
                // role.updatedAt=moment().toDate()
                // const result = await role.save();
                // const user = new User();
                // user.name = 'John Doe new 99 ';
                // user.age = 30;
                // const userReposne=await user.save();
                // Create a post instance
                // const post = new Post();
                // post.title = 'Sample Post 99';
                // post.content = 'This is a sample post. 99';
                // post.author ='64a91c1b4b3424452233fee9';
                //   // Save the user first
                //   // Save the post
                // const result =await post.save();
                // const resultUser = await this.userModel.findById("64a7b78dc01198b055e1d27e");
                // const result = await this.userModel.find().populate('posts');
                const user = yield user_schema_1.default.findById('64a91c1b4b3424452233fee9').exec();
                const post = yield post_schema_1.default.find({
                    author: '64a91c1b4b3424452233fee9'
                }).exec();
                // if (!user) {
                //   throw new Error('User not found');
                // }
                // const populatedUser:any = await Post.findById('64a91c1b4b3424452233fee9').exec();
                const result = { user: user, posts: post };
                // Retrieve a user and populate their posts
                // const result = await Post.findById('64a6ec54109edcd217f066a9').populate('author');
                return new response_1.default(true, 201, 'Insert operation successful', result);
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
                const role = yield this.roleModel.findById(pid);
                if (!role) {
                    return new response_1.default(true, 200, 'Record not available', role);
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
                const result = yield role.save();
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
                const role = yield this.roleModel.findById(pid);
                if (!role) {
                    return new response_1.default(true, 200, 'Record not available');
                }
                role.deletedAt = (0, moment_1.default)().toDate();
                const result = yield role.save();
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
                            { name: { $regex: search, $options: 'i' } },
                            { description: { $regex: search, $options: 'i' } },
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
                    this.roleModel.find()
                        .select({
                        "name": 1,
                        "description": 1,
                        "status": 1,
                        "_id": 0
                    })
                        .where(searchQuery)
                        .sort(sortQuery)
                        .skip(skip)
                        .limit(limit),
                    this.roleModel.countDocuments(searchQuery),
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
}
exports.default = RoleService;
