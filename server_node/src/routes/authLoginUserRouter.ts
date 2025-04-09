import { Router } from "express";
import authLoginUserControllers from "../controllers/authLoginControllers";

const loginRoute = Router();

loginRoute.post("/userLogin", authLoginUserControllers.loginUser);

export default loginRoute;

