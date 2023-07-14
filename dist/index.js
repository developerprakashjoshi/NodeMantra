"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./module-alias");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
if (process.env.NODE_ENV === 'production') {
    dotenv_1.default.config({ path: '.env.production' });
    console.log("Connect to production environment");
}
else if (process.env.NODE_ENV === 'development') {
    dotenv_1.default.config({ path: '.env.development' });
    console.log("Connect to development environment");
}
else if (process.env.NODE_ENV === 'stage') {
    dotenv_1.default.config({ path: '.env.stage' });
    console.log("Connect to stage environment");
}
else {
    console.log("Cannot connect to environment");
}
const mongoose_1 = __importDefault(require("@config/mongoose"));
const role_route_1 = __importDefault(require("@routes/role.route"));
const user_route_1 = __importDefault(require("@routes/user.route"));
const storage_route_1 = __importDefault(require("@routes/storage.route"));
const job_route_1 = __importDefault(require("@routes/job.route"));
const company_route_1 = __importDefault(require("@routes/company.route"));
const error_handler_1 = require("@libs/error.handler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
morgan_1.default.token("user-type", (req, res) => {
    return req.headers["user-type"];
});
morgan_1.default.token("req-body", (req) => {
    return JSON.stringify(req.body);
});
const logFormat = ":method :url :status :res[content-length] - :response-time ms\n" +
    "User Type: :user-type\n" +
    "Request Body: :req-body\n";
app.use((0, morgan_1.default)(logFormat));
app.get("/api/demo", (req, res) => {
    console.log(req.isAuthenticated());
    const jwtPayload = { id: 1 };
    const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET_KEY || "");
    res.json({ token: token });
});
app.get("/api/test", (req, res) => {
    res.json("test");
});
app.use("/api/v1/role", role_route_1.default);
app.use("/api/v1/storage", storage_route_1.default);
app.use("/api/v1/user", user_route_1.default);
app.use('/api/v1/job', job_route_1.default);
app.use('/api/v1/company', company_route_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Hello from server! server is running",
    });
});
app.use(error_handler_1.notFound);
app.use(error_handler_1.errorHandler);
// Handle connection events
mongoose_1.default.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose_1.default.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(process.env.APP_PORT, () => {
        console.log(`Server started with port ${process.env.APP_HOST}:${process.env.APP_PORT}`);
    });
});
