"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleStatus = void 0;
const mongoose_1 = require("mongoose");
var RoleStatus;
(function (RoleStatus) {
    RoleStatus[RoleStatus["Active"] = 1] = "Active";
    RoleStatus[RoleStatus["Inactive"] = 0] = "Inactive";
})(RoleStatus = exports.RoleStatus || (exports.RoleStatus = {}));
const RoleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, enum: [0, 1], default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
});
const Role = (0, mongoose_1.model)('Role', RoleSchema);
exports.default = Role;
