import { NextFunction, Request, Response } from "express";
import { createRoom } from "../services/roomService";
import { sendResponse } from "../utils/sendResponse";


export const handleCreateRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const adminId = req.user?.id
    console.log(req.user);
    if (!adminId) {
      const error = new Error()
      error.name = 'UserNotFoundError'
      throw error
    }
    const { roomName, roomCode, isPublic, isSpecialRoom, rounds, roundDuration, showUsernames, selectionMode } = req.body
    const responseRoom = await createRoom({ adminId, roomName, roomCode, isPublic, isSpecialRoom, rounds, roundDuration, showUsernames, selectionMode })
    sendResponse({
      res,
      message: 'Sala creada con éxito',
      data: responseRoom,
      statusCode: 201
    })
  } catch (error) {
    next(error)
  }
}