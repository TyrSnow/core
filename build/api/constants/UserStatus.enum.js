"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 除分步注册存在一个INITIALIZE状态外，其余用户默认是NORMAL
 * BLOCK是管理禁用该账户
 * DELETE是用户自己删除了自己的账户
 */
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["NORMAL"] = 0] = "NORMAL";
    UserStatus[UserStatus["BLOCK"] = 1] = "BLOCK";
    UserStatus[UserStatus["DELETE"] = 2] = "DELETE";
    UserStatus[UserStatus["INITIALIZE"] = 3] = "INITIALIZE";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
/**
 * 返回用户的状态
 */
function getUserStatus(user) {
    if (user.block) {
        return UserStatus.BLOCK;
    }
    if (user.delete) {
        return UserStatus.DELETE;
    }
    return UserStatus.NORMAL;
}
exports.getUserStatus = getUserStatus;
//# sourceMappingURL=UserStatus.enum.js.map