import { SUCCESS, ERROR } from '../tools/response'

class UserCtrl {
    /**
     * 用户注册
     */
    static regist(req, res) {
        let { name, phone, email, password } = req.body;
        
    }

    /**
     * 用户登陆
     */
    static login(req, res) {
        let { user, password, remember } = req.body;

    }

    /**
     * 更改密码
     */
    static change_password(req, res) {
        let { _id } = req.user;
        let { password } = req.body;


    }
}

export default UserCtrl