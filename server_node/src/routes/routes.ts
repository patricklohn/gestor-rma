import {Router} from 'express';
import personRouter from './personRouter';
import productRouter from './productRouter';
import warrantyRouter from './warrantyRouter';
import userRouter from './userRouter';
import loginRoute from './authLoginUserRouter';
import authenticateToken from '../helpers/autenticacao';

const routes = Router();
routes.use("/person", authenticateToken, personRouter);
routes.use("/product", authenticateToken, productRouter);
routes.use("/warranty", authenticateToken, warrantyRouter);
routes.use("/user", authenticateToken, userRouter);
routes.use("/login", loginRoute)

export default routes;