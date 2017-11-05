"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const logger_1 = require("./logger");
const config = {
    PORT: 8081,
    secretKey: 'OneWeekCan',
    db: db_1.default,
    log: logger_1.default
};
exports.default = config;
