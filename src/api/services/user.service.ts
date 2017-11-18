import User from '../models/User.model'
import {
    generate_sault,
    hash_password,
    valid_password
} from '../tools/util'
import { UserModel } from '../models/User'
import CODE from '../constants/Code.enum';
import { Regs } from '../constants/Reg.enum';

class AdminSrv {
    static create(
        name: string,
        phone: string,
        email: string,
        password: string,
        nickname: string,
        head?: string
    ): Promise<UserModel.IUser> {
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

        return user.save();
    }
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
    static valid_password(
        user: UserModel.IUser
    ): Promise<UserModel.User> {

    }
}

export default AdminSrv