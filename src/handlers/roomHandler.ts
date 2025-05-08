import { NextFunction, Request, Response } from "express";
import { createRoom, assignTemplatesToPlayers, joinRoom, startRoom, getTemplateFromUser, changeAssignedTemplate, memesFromRound } from "../services/roomService";
import { sendResponse } from "../utils/sendResponse";
import { showError } from "../utils/validateErrors";

export const handleCreateRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const adminId = req.user?.id
    if (!adminId) {
      const error = new Error()
      error.name = 'UserNotFoundError'
      throw error
    }
    const { roomName, roomCode, isPublic, isSpecialRoom, rounds, showUsernames, selectionMode } = req.body
    const responseCreateRoom = await createRoom({ adminId, roomName, roomCode, isPublic, isSpecialRoom, rounds, showUsernames, selectionMode })
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


export const handleAssignTemplatesToPlayers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roomId, roundId } = req.params
    const userId = req.user?.id
    if (!userId) {
      const error = new Error()
      error.name = 'UserNotFoundError'
      throw error
    }
    const userTemplate = await assignTemplatesToPlayers({ roomId, roundId, userId })
    sendResponse({
      res,
      statusCode: 200,
      message: 'Plantillas asignadas a los usuarios',
      data: userTemplate,
    })
  } catch (error) {
    next(error)
  }
}


export const handleGetTemplateFromUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roundId } = req.params
    const userId = req.user?.id
    showError(!userId, 'UserNotFoundError')

    const templatesUsers = await getTemplateFromUser(roundId, userId!)
    sendResponse({
      res,
      statusCode: 200,
      message: 'Plantilla obtenida con éxito',
      data: templatesUsers
    })
  } catch (error) {
    next(error)
  }
}

export const handleChangeAssignedTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roomId, roundId } = req.params
    const userId = req.user!.id
    console.log(userId);
    showError(!userId, 'UserNotFound')

    const newPlayerTemplate = await changeAssignedTemplate({ roomId, roundId, userId: userId!  })

    sendResponse({
      res,
      statusCode: 200,
      message: 'Plantilla cambiada!',
      data: newPlayerTemplate
    })

  } catch (error) {
    next(error)
  }
}


export const handleMemesFromRound = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {roundId} = req.params
    console.log(roundId);
    const memes = await memesFromRound(roundId)

    sendResponse({
      res,
      statusCode: 200,
      message: 'Memes obtenidos con éxito',
      data: memes
    })

  } catch (error) {
    next(error)
  }
}

//!Token del admin de la sala: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJkYjAwMmZlLTc0NmQtNDYyZi05MTEyLTc4NzliY2E0ZjMxZiIsInVzZXJOYW1lIjoiVXNlcjAwMSIsImVtYWlsIjoidXNlcjAwMUBnbWFpbC5jb20iLCJpYXQiOjE3NDY2MzM4NDAsImV4cCI6MTc0NzIzODY0MH0.usuA1FimbvtQBNSgPyOAmrEVeSMmsAGVI4zYBpFLtUY
//!Id del usuario1 que se unió: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjYjQ3N2MzLTk2NWMtNGFiYi04MjdhLTJmNjkwMTM2ZTgyMCIsInVzZXJOYW1lIjoiVXNlcjAwMiIsImVtYWlsIjoidXNlcjAwMkBnbWFpbC5jb20iLCJpYXQiOjE3NDY2MzQxNTYsImV4cCI6MTc0NzIzODk1Nn0.BRj3fBh55GyPHahx8f0xL5Q_Z0JWXqPx2PEjB52zwEw
//!Id del usuario2 que se unió: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNWMwNWQ4LWMwNzUtNDkzNS1hYWJhLWUyOWE0NzIwMWVjZCIsInVzZXJOYW1lIjoiVXNlcjAwMyIsImVtYWlsIjoidXNlcjAwM0BnbWFpbC5jb20iLCJpYXQiOjE3NDY2MjgxNTgsImV4cCI6MTc0NzIzMjk1OH0.Ny5nE7yk38kqvuxOuuF5w1lvBsCa1WsHVaQmZydchYc
//!Id de la sala1: 3db84440-db3d-4878-8162-7147ec5f47bf
//!Id de la ronda1: 43a83ad1-1473-4bc6-8ed3-f0fa50d8058c