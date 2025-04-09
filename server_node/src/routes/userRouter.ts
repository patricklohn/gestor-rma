import { Router } from "express";
import userControllers from "../controllers/userControllers";

const userRouter = Router();

userRouter.post("/create", userControllers.createUser);
userRouter.get("/all", userControllers.getAllUsers);

export default userRouter;