import { Router } from "express";
import { handleCreateRoom, handleAssignTemplatesToPlayers, handleJoinRoom, handleStartRoom, handleGetTemplatesFromUsers } from "../handlers/roomHandler";
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

roomRoutes.post("/room/:roomId/:roundId/assign-templates", authenticateToken, (req, res, next) => {
  handleAssignTemplatesToPlayers(req, res, next).catch(next)
})

roomRoutes.get("/room/:roundId/templates-users", authenticateToken, (req, res, next) => {
  handleGetTemplatesFromUsers(req, res, next).catch(next)
})

export default roomRoutes;
