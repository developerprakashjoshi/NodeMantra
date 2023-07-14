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
const storage_schema_1 = __importDefault(require("@models/storage.schema"));
const service_1 = __importDefault(require("@libs/service"));
const response_1 = __importDefault(require("@libs/response"));
const AWS = __importStar(require("aws-sdk"));
const mongodb_1 = require("mongodb");
// Define the AWS S3 configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
class StorageService extends service_1.default {
    constructor() {
        super();
        this.storageModel = storage_schema_1.default;
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.storageModel.count();
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
                const record = yield this.storageModel.find();
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
    retrieve(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
                if (!isValidObjectId) {
                    return new response_1.default(false, 400, "Invalid ObjectId", undefined);
                }
                let id = new mongodb_1.ObjectId(pid);
                const records = yield this.storageModel.findOne(id);
                if (!records) {
                    return new response_1.default(true, 200, "Record not available", records);
                }
                return new response_1.default(true, 200, "Read operation successful", records);
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
    retrieveByFilename(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.storageModel.findOne({ where: { name: fileName } });
                const params = {
                    Bucket: process.env.AWS_BUCKET || 'lnc-stage',
                    Key: fileName,
                };
                return new Promise((resolve, reject) => {
                    s3.getObject(params, (err, response) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        else {
                            // res.setHeader('Content-Type', data.ContentType);
                            // res.send(data.Body);
                            resolve(response.Body);
                        }
                    });
                });
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
    create(file, directoryname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the file content and name from the request
                const fileContent = file.buffer;
                const fileName = directoryname + "/" + file.originalname;
                const name = file.originalname;
                const params = {
                    Bucket: process.env.AWS_BUCKET || 'lnc-stage',
                    Key: fileName,
                    Body: fileContent,
                };
                return new Promise((resolve, reject) => {
                    s3.upload(params, (err, response) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.error(err);
                            reject(new response_1.default(false, 500, "Storage Server Error", err));
                        }
                        else {
                            console.log(`File uploaded successfully. ${response.Location}`);
                            const storage = new storage_schema_1.default();
                            storage.name = name;
                            storage.path = response.Location;
                            const result = yield storage.save();
                            resolve(new response_1.default(true, 200, "Storage operation successful", result));
                        }
                    }));
                });
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
    createFromBuffer(buffer, directoryname, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the file content and name from the request
                const fileContent = buffer;
                const fileName = directoryname + "/" + file;
                const name = file;
                const params = {
                    Bucket: process.env.AWS_BUCKET || 'lnc-stage',
                    Key: fileName,
                    Body: fileContent,
                };
                return new Promise((resolve, reject) => {
                    s3.upload(params, (err, response) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        else {
                            console.log(`File uploaded successfully. ${response.Location}`);
                            const storage = new storage_schema_1.default();
                            storage.name = name;
                            storage.path = response.Location;
                            const result = yield storage.save();
                            resolve(new response_1.default(true, 200, "Storage operation successful", result));
                        }
                    }));
                });
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
    update(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileContent = data.buffer;
            const fileName = data.originalname;
            const isValidObjectId = mongodb_1.ObjectId.isValid(pid);
            if (!isValidObjectId) {
                return new response_1.default(false, 400, "Invalid ObjectId", undefined);
            }
            let id = new mongodb_1.ObjectId(pid);
            const role = yield this.storageModel.findOneBy(id);
            if (!role) {
                return new response_1.default(true, 200, "Record not available", role);
            }
            const params = {
                Bucket: 'codegify',
                Key: fileName,
                Body: fileContent,
            };
            return new Promise((resolve, reject) => {
                s3.upload(params, (err, response) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.error(err);
                        reject(new response_1.default(false, 500, "Storage Server Error", err));
                    }
                    else {
                        try {
                            console.log(`File upldated successfully. ${response.Location}`);
                            const storage = yield this.storageModel.findOneOrFail(id);
                            storage.name = fileName;
                            storage.path = response.Location;
                            const result = yield this.storageModel.save(storage);
                            resolve(new response_1.default(true, 200, "Storage operation successful", result));
                        }
                        catch (error) {
                            reject(new response_1.default(false, 500, "Storage Server Error", err));
                        }
                    }
                }));
            });
        });
    }
    delete(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = new mongodb_1.ObjectId(pid);
                const storage = yield this.storageModel.findOneOrFail(id);
                const params = {
                    Bucket: 'codegify',
                    Key: storage.name,
                };
                return new Promise((resolve, reject) => {
                    s3.deleteObject(params, (err, response) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        else {
                            console.log(`File deleted successfully. ${response.Location}`);
                            const result = yield this.storageModel.delete(id);
                            resolve(result);
                        }
                    }));
                });
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
    datatable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.storageModel.find({
                    order: {
                        id: "DESC",
                    },
                    skip: 0,
                    take: 10,
                });
                return records;
            }
            catch (error) {
                return new response_1.default(false, 500, "Internal Server Error", undefined, undefined, error.message);
            }
        });
    }
}
exports.default = StorageService;
