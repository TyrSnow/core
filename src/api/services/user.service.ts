import User from '../models/User.model'
import {
    generate_sault,
    hash_password,
    valid_password
} from '../tools/util'
import { UserModel } from '../models/User'
import CODE from '../constants/Code.enum';
import { Regs } from '../constants/Reg.enum';

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
    static create(
        name: string,
        phone: string,
        email: string,
        password: string,
        nickname: string,
        head?: string
    ): Promise<UserModel.IUserInfo> {
        let sault = generate_sault();
        let user = new User({
            name,
            phone,
            email,
            sault,
            password: {
                name: hash_password(name, sault, password),
                phone: hash_password(phone, sault, password),
                email: hash_password(email, sault, password)
            },
            nickname,
            head
        });

        return user.save().then(
            (_user) => {
                return Promise.resolve({
                    _id: _user._id,
                    name: _user.name,
                    email: _user.email,
                    phone: _user.phone,
                    nickname: _user.nickname,
                    head: _user.head
                })
            },
            (err) => {
                if (err.code === 11000) {
                    if (err.errmsg.indexOf('email') !== -1) {
                        return Promise.reject(CODE.DUMPLICATE_EMAIL);
                    } else if (err.errmsg.indexOf('phone') !== -1) {
                        return Promise.reject(CODE.DUMPLICATE_PHONE);
                    } else if (err.errmsg.indexOf('name') !== -1) {
                        return Promise.reject(CODE.DUMPLICATE_NAME);
                    }
                }
                return Promise.reject(err);
            }
        );
    }

    /**
     * 判断一个用户名是否已经被使用
     * @param name 
     */
    static valid_name(
        name: string
    ): Promise<any> {
        return User.findOne({
            name
        }).then(
            (user) => {
                if (user) {
                    return Promise.reject(CODE.DUMPLICATE_NAME);
                } else {
                    return Promise.resolve();
                }
            }
        )
    }

    /**
     * 获得指定的用户
     * @param user 'name|phone|email'
     */
    static find_user(
        user: string
    ): Promise<UserModel.IUser> {
        // 判断user的格式
        let query: any = {
            name: user
        };
        if (user.match(Regs.phone)) {
            query = {
                phone: user
            }
        } else if (user.match(Regs.email)) {
            query = {
                email: user
            }
        }
        return User.findOne(query).then(
            (user) => {
                if (user) {
                    return Promise.resolve(user);
                } else {
                    return Promise.reject(CODE.USER_NOT_EXIST)
                }
            }
        )
    }

    /**
     * 获得指定id的用户
     * @param id 
     */
    static find_user_by_id(
        id: string
    ): Promise<UserModel.IUser> {
        return User.findOne({
            _id: id
        }).then(
            (user) => {
                if (user) {
                    return Promise.resolve(user);
                } else {
                    return Promise.reject(CODE.USER_NOT_EXIST)
                }
            }
        )
    }
    
    /**
     * 核实用户的密码
     * @param user 
     * @param name 
     * @param pwd 
     */
    static valid_password(
        user: UserModel.IUser,
        name: string,
        pwd: string
    ): Promise<UserModel.IUserInfo> {
        return new Promise((resolve, reject) => {
            if (valid_password(name, user.sault, pwd, user.password)) {
                resolve(user);
            } else {
                reject(CODE.PASSWORD_NOT_MATCH);
            }
        })
    }

    static change_password(
        user: UserModel.IUser,
        newPwd: string
    ): Promise<any> {
        let { name, phone, email, sault } = user;
        return User.findOneAndUpdate({
            _id: user._id
        }, {
            password: {
                name: hash_password(name, sault, newPwd),
                phone: hash_password(phone, sault, newPwd),
                email: hash_password(email, sault, newPwd)
            }
        }).then(
            (_user) => {
                if (_user) {
                    return Promise.resolve();
                } else {
                    return Promise.reject(CODE.USER_NOT_EXIST);
                }
            }
        );
    }
}

export default UserSrv