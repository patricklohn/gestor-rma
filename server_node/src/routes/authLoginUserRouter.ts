import { Router } from "express";
import authLoginControllers from "../controllers/authLoginControllers";

const loginRoute = Router();

loginRoute.post("/userLogin", authLoginControllers.loginUser);

export default loginRoute;
