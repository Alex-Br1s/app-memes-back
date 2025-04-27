import { Router } from "express";
import { handleCreateRoom, handleJoinRoom } from "../handlers/roomHandler";
import { authenticateToken } from "../middlewares/authenticateToken";

const roomRoutes = Router();

roomRoutes.post("/create-room", authenticateToken, (req, res, next) => {
  handleCreateRoom(req, res, next).catch(next);
});


roomRoutes.post("/room/:roomId/join", authenticateToken, (req, res, next) => {
  handleJoinRoom(req, res, next).catch(next)
})



export default roomRoutes;
