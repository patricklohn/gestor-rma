import {Router} from 'express';
import personRouter from './personRouter';
import productRouter from './productRouter';
import warrantyRouter from './warrantyRouter';

const routes = Router();
routes.use("/person", personRouter);
routes.use("/product", productRouter);
routes.use("/warranty", warrantyRouter);

export default routes;