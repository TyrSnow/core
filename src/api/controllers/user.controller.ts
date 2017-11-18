class UserCtrl {
    static regist(req, res) {
        let { name, phone, email, password } = req.body;
        
    }
    static login(req, res) {
        let { user, password, remember } = req.body;

    }
    static change_password(req, res) {
        let { _id } = req.user;
        let { password } = req.body;


    }
}

export default UserCtrl