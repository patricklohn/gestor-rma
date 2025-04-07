import {Router} from 'express';
import personRouter from './personRouter';
import productRouter from './productRouter';

const routes = Router();
routes.use("/person", personRouter);
routes.use("/product", productRouter);

export default routes;