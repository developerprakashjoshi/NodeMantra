"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: '',
    host: 'localhost',
    database: 'adminjs',
    password: '',
    port: 5432,
});
const pgSessionStore = new ((0, connect_pg_simple_1.default)(express_session_1.default))({
    pool: pool,
    tableName: 'session',
});
const sessionMiddleware = (req, res, next) => {
    return (0, express_session_1.default)({
        store: pgSessionStore,
        secret: '11a5e473653ae07ef6742ab95d4c09681e093930e77da',
        resave: false,
        saveUninitialized: false,
    })(req, res, next);
};
exports.default = sessionMiddleware;
