import {Router} from 'express';
import personRouter from './personRouter';

const routes = Router();
routes.use("/person", personRouter);

export default routes;