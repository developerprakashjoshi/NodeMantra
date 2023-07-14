"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor() {
        console.log("Hello");
    }
    static response(res, message) {
        return res.status(200).json({ success: true, message });
    }
}
exports.default = Controller;
