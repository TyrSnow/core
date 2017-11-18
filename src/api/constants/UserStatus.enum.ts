import { UserModel } from "../models/User";

/**
 * 除分步注册存在一个INITIALIZE状态外，其余用户默认是NORMAL
 * BLOCK是管理禁用该账户
 * DELETE是用户自己删除了自己的账户
 */
export enum UserStatus {
    NORMAL,
    BLOCK,
    DELETE,
    INITIALIZE
}
export function getUserStatus(user: UserModel.IUser) {
    if (user.block) {
        return UserStatus.BLOCK;
    }
    if (user.delete) {
        return UserStatus.DELETE;
    }
    return UserStatus.NORMAL;
}