import { Router } from "express";
import { handleGetUserById, handleLoginUser, handleRegisterUser, handleUpdateUser } from "../handlers/user";
import { authenticateToken } from "../middlewares/authenticateToken";
import { validateLogin, validateRegister, validateUserData } from "../middlewares/validateData";

const userRoutes = Router();

userRoutes.post("/sign-up", validateRegister, (req, res, next) => {
  handleRegisterUser(req, res, next).catch(next);
});

userRoutes.post("/log-in", validateLogin, (req, res, next) => {
  handleLoginUser(req, res, next).catch(next)
})

userRoutes.get("/user/:id", authenticateToken, (req, res, next) => {
  handleGetUserById(req, res, next).catch(next);
});

userRoutes.put("/update/my-profile", validateUserData, authenticateToken, (req, res, next) => {
  handleUpdateUser(req, res, next).catch(next);
})

export default userRoutes;
