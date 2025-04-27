import { Router } from "express";
import { handleCreateRoom, handleJoinRoom } from "../handlers/roomHandler";
import { authenticateToken } from "../middlewares/authenticateToken";
import { validateRoomData } from "../middlewares/validateData";

const roomRoutes = Router();

roomRoutes.post("/create-room", validateRoomData, authenticateToken, (req, res, next) => {
  handleCreateRoom(req, res, next).catch(next);
});


roomRoutes.post("/room/:roomId/join", authenticateToken, (req, res, next) => {
  handleJoinRoom(req, res, next).catch(next)
})

/* roomRoutes.put("/room/:roomId/play", authenticateToken, (req, res, next) => {
  handlePlayRoom(req, res, next).catch(next)
})
 */

export default roomRoutes;
