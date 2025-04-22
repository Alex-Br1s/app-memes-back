import { Router } from "express";
import { handleGetUserById, handleRegisterUser } from "../handlers/user";
import { authenticateToken } from "../middlewares/authenticateToken";

const userRoutes = Router();

userRoutes.post("/sign-up", (req, res, next) => {
  handleRegisterUser(req, res, next).catch(next);
});

userRoutes.get("user/:id", authenticateToken, (req, res, next) => {
  handleGetUserById(req, res, next).catch(next);
});

export default userRoutes;
