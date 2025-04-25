import { Router } from "express";
import { handleCreateRoom } from "../handlers/roomHandler";
import { authenticateToken } from "../middlewares/authenticateToken";

const roomRoutes = Router();

roomRoutes.post("/create-room", authenticateToken, (req, res, next) => {
  handleCreateRoom(req, res, next).catch(next);
});

export default roomRoutes;
