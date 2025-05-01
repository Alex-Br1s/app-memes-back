import { Router } from "express";
import { handleCreateRoom, handleGetRandomTemplates, handleJoinRoom, handleStartRoom } from "../handlers/roomHandler";
import { authenticateToken } from "../middlewares/authenticateToken";
import { validateRoomData, validateRoomJoinData } from "../middlewares/validateData";

const roomRoutes = Router();

roomRoutes.post("/create-room", validateRoomData, authenticateToken, (req, res, next) => {
  handleCreateRoom(req, res, next).catch(next);
});


roomRoutes.post("/room/:roomId/join", validateRoomJoinData, authenticateToken, (req, res, next) => {
  handleJoinRoom(req, res, next).catch(next)
})

roomRoutes.put("/room/:roomId/start", authenticateToken, (req, res, next) => {
  handleStartRoom(req, res, next).catch(next)
})

roomRoutes.get("/room/:roomId/assign-templates", authenticateToken, (req, res, next) => {
  handleGetRandomTemplates(req, res, next).catch(next)
})

export default roomRoutes;
