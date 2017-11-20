"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = require("../models/User.model");
const util_1 = require("../tools/util");
const Code_enum_1 = require("../constants/Code.enum");
const Reg_enum_1 = require("../constants/Reg.enum");
class UserSrv {
    /**
     * 创建一个新的用户
     * @param name
     * @param phone
     * @param email
     * @param password
     * @param nickname
     * @param head
     */
    static create(name, phone, email, password, nickname, head) {
        let sault = util_1.generate_sault();
        let user = new User_model_1.default({
            name,
            phone,
            email,
            sault,
            password: {
                name: util_1.hash_password(name, sault, password),
                phone: util_1.hash_password(phone, sault, password),
                email: util_1.hash_password(email, sault, password)
            },
            nickname,
            head
        });
        return user.save().then((_user) => {
            return Promise.resolve({
                _id: _user._id,
                name: _user.name,
                email: _user.email,
                phone: _user.phone,
                nickname: _user.nickname,
                head: _user.head
            });
        }, (err) => {
            if (err.code === 11000) {
                if (err.errmsg.indexOf('email') !== -1) {
                    return Promise.reject(Code_enum_1.default.DUMPLICATE_EMAIL);
                }
                else if (err.errmsg.indexOf('phone') !== -1) {
                    return Promise.reject(Code_enum_1.default.DUMPLICATE_PHONE);
                }
                else if (err.errmsg.indexOf('name') !== -1) {
                    return Promise.reject(Code_enum_1.default.DUMPLICATE_NAME);
                }
            }
            return Promise.reject(err);
        });
    }
    /**
     * 判断一个用户名是否已经被使用
     * @param name
     */
    static valid_name(name) {
        return User_model_1.default.findOne({
            name
        }).then((user) => {
            if (user) {
                return Promise.reject(Code_enum_1.default.DUMPLICATE_NAME);
            }
            else {
                return Promise.resolve();
            }
        });
    }
    /**
     * 获得指定的用户
     * @param user 'name|phone|email'
     */
    static find_user(user) {
        // 判断user的格式
        let query = {
            name: user
        };
        if (user.match(Reg_enum_1.Regs.phone)) {
            query = {
                phone: user
            };
        }
        else if (user.match(Reg_enum_1.Regs.email)) {
            query = {
                email: user
            };
        }
        return User_model_1.default.findOne(query).then((user) => {
            if (user) {
                return Promise.resolve(user);
            }
            else {
                return Promise.reject(Code_enum_1.default.USER_NOT_EXIST);
            }
        });
    }
    /**
     * 获得指定id的用户
     * @param id
     */
    static find_user_by_id(id) {
        return User_model_1.default.findOne({
            _id: id
        }).then((user) => {
            if (user) {
                return Promise.resolve(user);
            }
            else {
                return Promise.reject(Code_enum_1.default.USER_NOT_EXIST);
            }
        });
    }
    /**
     * 核实用户的密码
     * @param user
     * @param name
     * @param pwd
     */
    static valid_password(user, name, pwd) {
        return new Promise((resolve, reject) => {
            if (util_1.valid_password(name, user.sault, pwd, user.password)) {
                resolve(user);
            }
            else {
                reject(Code_enum_1.default.PASSWORD_NOT_MATCH);
            }
        });
    }
    static change_password(user, newPwd) {
        let { name, phone, email, sault } = user;
        return User_model_1.default.findOneAndUpdate({
            _id: user._id
        }, {
            password: {
                name: util_1.hash_password(name, sault, newPwd),
                phone: util_1.hash_password(phone, sault, newPwd),
                email: util_1.hash_password(email, sault, newPwd)
            }
        }).then((_user) => {
            if (_user) {
                return Promise.resolve();
            }
            else {
                return Promise.reject(Code_enum_1.default.USER_NOT_EXIST);
            }
        });
    }
}
exports.default = UserSrv;
//# sourceMappingURL=user.service.js.map