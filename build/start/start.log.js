"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const config_1 = require("../config");
log4js.configure(config_1.default.log);
let logger = log4js.getLogger('default');
logger.info('[Logger]initialized.');
