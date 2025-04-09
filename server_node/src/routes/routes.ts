import {Router} from 'express';
import personRouter from './personRouter';
import productRouter from './productRouter';
import warrantyRouter from './warrantyRouter';
import userRouter from './userRouter';
import loginRoute from './authLoginUserRouter';

const routes = Router();
routes.use("/person", personRouter);
routes.use("/product", productRouter);
routes.use("/warranty", warrantyRouter);
routes.use("/user", userRouter);
routes.use("/login", loginRoute)

export default routes;