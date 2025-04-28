import { NextFunction, Request, Response } from "express";
import { createRoom, joinRoom, startRoom } from "../services/roomService";
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
    const responseCreateRoom = await createRoom({ adminId, roomName, roomCode, isPublic, isSpecialRoom, rounds, roundDuration, showUsernames, selectionMode })
    sendResponse({
      res,
      message: 'Sala creada con éxito',
      data: responseCreateRoom,
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

    const responseJoinRoom = await joinRoom({ userId, roomId, roomCode })
    sendResponse({
      res,
      statusCode: 200,
      message: 'Te uniste a la sala con éxito',
      data: responseJoinRoom,
    })

  } catch (error) {
    next(error)
  }
}

export const handleStartRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roomId } = req.params
    const userId = req.user?.id
    if (!userId) {
      const error = new Error()
      error.name = 'UserNotFoundError'
      throw error
    }
    const responsePlayRoom = await startRoom({ roomId, userId })
    sendResponse({
      res,
      statusCode: 200,
      message: 'Iniciaste la sala, a jugar!',
      data: responsePlayRoom,
    })
  } catch (error) {
    next(error)
  }
}

//!Id del admin de la sala: 
//!Token del admin de la sala: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwZjA5Y2FhLTEwYjktNDg3OC04ODY2LWMwNmMwZTM2YzNhNSIsInVzZXJOYW1lIjoiVXNlcjAwMSIsImVtYWlsIjoidXNlcjAwMUBnbWFpbC5jb20iLCJpYXQiOjE3NDU4MDAwMTQsImV4cCI6MTc0NjQwNDgxNH0.0ASzddlu99PFcPR5QtVZkSCIg1hUGbZeBmSdQI7uxDk
//!Id del usuario que se unió: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkNjAwYzE2LWZjNzAtNDhhMy1iOTVjLWE4MzRjMzZhMzAxMiIsInVzZXJOYW1lIjoiVXNlcjAwMiIsImVtYWlsIjoidXNlcjAwMkBnbWFpbC5jb20iLCJpYXQiOjE3NDU4MDAxMDAsImV4cCI6MTc0NjQwNDkwMH0.rJbWASt6KbzdsA9XXCFplDo9i2jJN2BMOyhWi2Z0ljM
//!Id de la sala1: 6b5802c7-0d59-412f-a3ac-9b3f3618c710