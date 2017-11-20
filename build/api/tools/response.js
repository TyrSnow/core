"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const Code_enum_1 = require("../constants/Code.enum");
let log = log4js.getLogger('default');
function SUCCESS(req, res, prefix) {
    return (data) => {
        res.json({
            success: true,
            data: data
        });
        log.info(prefix, 'Success');
    };
}
exports.SUCCESS = SUCCESS;
function ERROR(req, res, prefix) {
    return (err) => {
        if (err instanceof Error) {
            // 未处理的系统错误
            res.status(500).send(Code_enum_1.default.ERROR);
            log.error(prefix, 'Error occur：', err);
        }
        else {
            let { status = 200 } = err, other = __rest(err, ["status"]);
            res.status(status).send(other);
            log.warn(prefix, 'Response error：', err);
        }
    };
}
exports.ERROR = ERROR;
//# sourceMappingURL=response.js.map