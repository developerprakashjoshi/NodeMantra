"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const err = new Error("Not found");
    res.status(404);
    next(err);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    res.status(404);
    res.json({
        "success": false,
        "statusCode": 404,
        "message": err.message
    });
};
exports.errorHandler = errorHandler;
