import { Router } from "express";
import { handleGetUserById, handleLoginUser, /* handleProfileSummary, */ handleRegisterUser, handleUpdateUser } from "../handlers/userHandler";
import { authenticateToken } from "../middlewares/authenticateToken";
import { validateLogin, validateRegister, validateUserData } from "../middlewares/validateData";

const userRoutes = Router();

//? AUTHENTICATION ROUTES
userRoutes.post("/sign-up", validateRegister, (req, res, next) => {
  handleRegisterUser(req, res, next).catch(next);
});

userRoutes.post("/log-in", validateLogin, (req, res, next) => {
  handleLoginUser(req, res, next).catch(next)
})

//? "CRUD" ROUTES
userRoutes.get("/user/:id", authenticateToken, (req, res, next) => {
  handleGetUserById(req, res, next).catch(next);
});

userRoutes.put("/update/profile", validateUserData, authenticateToken, (req, res, next) => {
  handleUpdateUser(req, res, next).catch(next);
})




//? Advances ROUTES
/* userRoutes.put("/user/:id/profile-summary", authenticateToken, (req, res, next) => {
  handleProfileSummary(req, res, next).catch(next);
}) */



export default userRoutes;
