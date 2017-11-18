import {Router} from 'express'
import UserCtrl from '../controllers/user.controller';

let userRoutes = Router();

userRoutes.post('/', UserCtrl.regist);

export default userRoutes