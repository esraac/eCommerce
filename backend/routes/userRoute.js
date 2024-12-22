import express from "express";
import { loginUser, registerUser, updateUserProfile, changePassword } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update", authUser, updateUserProfile);
userRouter.put("/change-password", authUser, changePassword);

export default userRouter;