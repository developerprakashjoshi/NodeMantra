"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(success, statusCode, message, data, count, error) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.count = count;
        this.error = error;
    }
}
exports.default = Response;
