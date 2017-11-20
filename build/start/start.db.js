"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const log4js = require("log4js");
const config_1 = require("../config");
mongoose.connect(config_1.default.db.uri);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
let logger = log4js.getLogger('default');
db.on('error', (err) => {
    logger.fatal('[DB]Initialize error: ', err);
});
//# sourceMappingURL=start.db.js.map