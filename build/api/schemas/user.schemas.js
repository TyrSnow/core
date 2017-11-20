"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UserController对应的schema
 */
const Reg_enum_1 = require("../constants/Reg.enum");
const UserSchemas = {
    /** 注册 */
    regist: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    required: true
                },
                phone: {
                    type: 'string',
                    required: true,
                    pattern: Reg_enum_1.Regs.phoneStr
                },
                email: {
                    type: 'string',
                    required: true,
                    pattern: Reg_enum_1.Regs.emailStr
                },
                password: {
                    type: 'string',
                    required: true
                }
            }
        }
    },
    login: {
        body: {
            type: 'object',
            properties: {
                user: {
                    type: 'string',
                    required: true
                },
                password: {
                    type: 'string',
                    required: true
                },
                remember: {
                    type: 'boolean'
                }
            }
        }
    },
    changePassword: {
        body: {
            type: 'object',
            properties: {
                oldPwd: {
                    type: 'string',
                    required: true
                },
                newPwd: {
                    type: 'string',
                    required: true
                }
            }
        }
    }
};
exports.default = UserSchemas;
//# sourceMappingURL=user.schemas.js.map