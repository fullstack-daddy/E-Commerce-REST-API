import express from "express";
import { registerUser, userLogin } from "../app/controllers/authController.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", userLogin);

export default AuthRouter;
