"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_model_1 = require("../models/Admin.model");
const util_1 = require("../tools/util");
class AdminSrv {
    static create(name, phone, email, password, nickname, head) {
        let sault = util_1.generate_sault();
        let admin = new Admin_model_1.default({
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
        return admin.save().then((_admin) => {
            return Promise.resolve(_admin);
        }, (err) => {
            console.log(err);
            return Promise.reject(err);
        });
    }
}
exports.default = AdminSrv;
