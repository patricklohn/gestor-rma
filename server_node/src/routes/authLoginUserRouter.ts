import { Router } from "express";
import authLoginUserControllers from "../controllers/authLoginUserControllers";

const loginRoute = Router();

loginRoute.post("/login", authLoginUserControllers.login);

export default loginRoute;

