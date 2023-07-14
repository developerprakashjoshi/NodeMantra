"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAliases({
    '@root': __dirname,
    '@controllers': `${__dirname}/app/controllers`,
    '@models': `${__dirname}/app/models`,
    '@services': `${__dirname}/app/services`,
    '@middlewares': `${__dirname}/app/middlewares`,
    '@validators': `${__dirname}/app/validators`,
    '@libs': `${__dirname}/libs`,
    '@config': `${__dirname}/config`,
    '@routes': `${__dirname}/routes`
});
