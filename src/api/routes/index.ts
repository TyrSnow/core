import { Router } from 'express'
import userRoutes from './user.route';

let routes = Router();

routes.use('/Users', userRoutes);

export default routes;