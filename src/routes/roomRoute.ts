import { Router } from "express";
import { handleCreateRoom } from "../handlers/roomHandler";

const roomRoutes = Router();

roomRoutes.post("/create-room", (req, res, next) => {
  handleCreateRoom(req, res, next).catch(next);
});

export default roomRoutes;
