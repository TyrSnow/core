"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const SAULT_LENGTH = 64;
function randomHex() {
    return Math.random().toString(16).slice(2);
}
function generate_sault(seed = '') {
    let sault = seed;
    let len = 0;
    while (len < SAULT_LENGTH) {
        sault += randomHex();
        len = sault.length;
    }
    return sault;
}
exports.generate_sault = generate_sault;
function hash_password(name, sault, pwd) {
    let hash = crypto.createHash('sha256');
    hash.update(name);
    hash.update(sault);
    hash.update(pwd);
    return hash.digest('hex');
}
exports.hash_password = hash_password;
function valid_password(user, sault, pwd, password) {
    let hashed = hash_password(user, sault, pwd);
    for (let key in password) {
        if (password[key] === hashed) {
            return true;
        }
    }
    return false;
}
exports.valid_password = valid_password;
