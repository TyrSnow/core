import Admin from '../models/Admin.model'
import {
    generate_sault,
    hash_password,
    valid_password
} from '../tools/util'
import { AdminModel } from '../models/Admin'

class AdminSrv {
    static create(
        name: string,
        phone: string,
        email: string,
        password: string,
        nickname: string,
        head?: string
    ): Promise<AdminModel.IAdmin> {
        let sault = generate_sault();
        let admin = new Admin({
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

        return admin.save().then(
            (_admin) => {
                return Promise.resolve(_admin);
            },
            (err) => {
                console.log(err)
                return Promise.reject(err);
            }
        );
    }
}

export default AdminSrv