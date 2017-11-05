"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("express-jwt");
const index_1 = require("../../config/index");
const AuthType_enum_1 = require("../constants/AuthType.enum");
const response_1 = require("./response");
const Code_enum_1 = require("../constants/Code.enum");
let requestUser = jwt({
    secret: index_1.default.secretKey
});
exports.requestUser = requestUser;
let requestAdmin = (req, res, next) => {
    requestUser(req, res, () => {
        if (req.user.auth === AuthType_enum_1.default.ADMIN || req.user.auth === AuthType_enum_1.default.ROOT) {
            next();
        }
        else {
            response_1.ERROR(req, res, '[AUTH ADMIN]')(Code_enum_1.default.LOW_AUTHORIZE);
        }
    });
};
exports.requestAdmin = requestAdmin;
let requestRoot = (req, res, next) => {
    requestUser(req, res, () => {
        if (req.user.auth === AuthType_enum_1.default.ROOT) {
            next();
        }
        else {
            response_1.ERROR(req, res, '[AUTH ROOT]')(Code_enum_1.default.LOW_AUTHORIZE);
        }
    });
};
exports.requestRoot = requestRoot;
