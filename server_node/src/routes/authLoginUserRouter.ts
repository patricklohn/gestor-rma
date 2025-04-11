import { Router } from "express";
import { loginUser } from "../controllers/authLoginControllers";

const loginRoute = Router();

loginRoute.post("/userLogin", loginUser);

export default loginRoute;
