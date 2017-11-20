"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const token_service_1 = require("../services/token.service");
const response_1 = require("../tools/response");
class UserCtrl {
    /**
     * 用户注册
     */
    static regist(req, res) {
        let { name, phone, email, password, nickname } = req.body;
        user_service_1.default.create(name, phone, email, password, nickname).then(response_1.SUCCESS(req, res, '[UserCtrl.regist]')).catch(response_1.ERROR(req, res, '[UserCtrl.regist]'));
    }
    /**
     * 用户登陆
     */
    static login(req, res) {
        let { user, password, remember } = req.body;
        user_service_1.default.find_user(user).then(_user => user_service_1.default.valid_password(_user, user, password)).then((_user) => {
            return Promise.resolve(token_service_1.default.sign({
                _id: _user._id,
                name: _user.name,
                email: _user.email,
                phone: _user.phone,
                nickname: _user.nickname,
                head: _user.head
            }, remember ? '30d' : '1s'));
        }).then(response_1.SUCCESS(req, res, '[UserCtrl.login]')).catch(response_1.ERROR(req, res, '[UserCtrl.login]'));
    }
    /**
     * 更改密码
     */
    static change_password(req, res) {
        let { _id, name } = req.user;
        let { oldPwd, newPwd } = req.body;
        user_service_1.default.find_user_by_id(_id).then(_user => user_service_1.default.valid_password(_user, name, oldPwd)).then(_user => user_service_1.default.change_password(_user, newPwd)).then(response_1.SUCCESS(req, res, '[UserCtrl.change_password]')).catch(response_1.ERROR(req, res, '[UserCtrl.change_password]'));
    }
}
exports.default = UserCtrl;
//# sourceMappingURL=user.controller.js.map