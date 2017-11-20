"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../../config");
class TokenSrv {
    static sign(payload, expiresIn = '1h') {
        return jwt.sign(payload, config_1.default.secretKey, {
            expiresIn
        });
    }
}
exports.default = TokenSrv;
//# sourceMappingURL=token.service.js.map