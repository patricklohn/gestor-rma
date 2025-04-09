import {Router} from 'express';
import personRouter from './personRouter';
import productRouter from './productRouter';
import warrantyRouter from './warrantyRouter';
import userRouter from './userRouter';

const routes = Router();
routes.use("/person", personRouter);
routes.use("/product", productRouter);
routes.use("/warranty", warrantyRouter);
routes.use("/user", userRouter);

export default routes;