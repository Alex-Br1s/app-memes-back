import { NextFunction, Request, Response } from "express";
import { createRoom, joinRoom } from "../services/roomService";
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

export const handleJoinRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roomCode } = req.body
    const { roomId } = req.params
    const userId = req.user?.id
    if (!userId) {
      const error = new Error()
      error.name = 'UserNotFoundError'
      throw error
    }

    const responseRoom = await joinRoom({ userId, roomId, roomCode })
    sendResponse({
      res,
      statusCode: 200,
      message: 'Te uniste a la sala con éxito',
      data: responseRoom,
    })

  } catch (error) {
    next(error)
  }
}