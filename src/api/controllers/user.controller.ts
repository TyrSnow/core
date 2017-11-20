import UserSrv from '../services/user.service'
import TokenSrv from '../services/token.service'

import { SUCCESS, ERROR } from '../tools/response'

class UserCtrl {
    /**
     * 用户注册
     */
    static regist(req, res) {
        let { name, phone, email, password, nickname } = req.body;
        UserSrv.create(name, phone, email, password, nickname).then(
            SUCCESS(req, res, '[UserCtrl.regist]')
        ).catch(
            ERROR(req, res, '[UserCtrl.regist]')
        );
    }

    /**
     * 用户登陆
     */
    static login(req, res) {
        let { user, password, remember } = req.body;
        UserSrv.find_user(user).then(
            _user => UserSrv.valid_password(_user, user, password)
        ).then(
            (_user) => {
                return Promise.resolve(TokenSrv.sign({
                    _id: _user._id,
                    name: _user.name,
                    email: _user.email,
                    phone: _user.phone,
                    nickname: _user.nickname,
                    head: _user.head
                }, remember ? '30d' : '1s'))
            }
        ).then(
            SUCCESS(req, res, '[UserCtrl.login]')
        ).catch(
            ERROR(req, res, '[UserCtrl.login]')
        )
    }

    /**
     * 更改密码
     */
    static change_password(req, res) {
        let { _id, name } = req.user;
        let { oldPwd, newPwd } = req.body;

        UserSrv.find_user_by_id(_id).then(
            _user => UserSrv.valid_password(_user, name, oldPwd)
        ).then(
            _user => UserSrv.change_password(_user, newPwd)
        ).then(
            SUCCESS(req, res, '[UserCtrl.change_password]')
        ).catch(
            ERROR(req, res, '[UserCtrl.change_password]')
        )

    }
}

export default UserCtrl