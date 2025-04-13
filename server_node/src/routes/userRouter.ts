import { Router } from "express";
import userControllers from "../controllers/userControllers";
import authenticateToken from "../middlewares/autenticacao";

const userRouter = Router();

userRouter.post("/create", userControllers.createUser);
userRouter.get("/all", userControllers.getAllUsers);

export default userRouter;