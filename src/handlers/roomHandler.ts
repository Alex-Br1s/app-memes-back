import { NextFunction, Request, Response } from "express";
import { createRoom, assignTemplatesToPlayers, joinRoom, startRoom, getTemplateFromUser } from "../services/roomService";
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

//!Token del admin de la sala: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlkYjEyYzg1LWI1NGItNDgyMS04YjU4LTRhZDhlY2E4OTQ3OSIsInVzZXJOYW1lIjoiVXNlcjAwMSIsImVtYWlsIjoidXNlcjAwMUBnbWFpbC5jb20iLCJpYXQiOjE3NDY0ODM2NjMsImV4cCI6MTc0NzA4ODQ2M30.e0y8bLhFM2lKsKC71Q2URC9gatF0EyY12tw700ItwJk
//!Id del usuario1 que se unió: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxNTNlMTI5LTRkNWItNDViZC1hNzg2LTEyZjE1MDY4ZjdiMSIsInVzZXJOYW1lIjoiVXNlcjAwMiIsImVtYWlsIjoidXNlcjAwMkBnbWFpbC5jb20iLCJpYXQiOjE3NDY0ODM3NDEsImV4cCI6MTc0NzA4ODU0MX0.yWD-ovf0pDB9RTUCPf5triCVQ3qO0BuyIUlscEHOgdQ
//!Id del usuario2 que se unió: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkNGI2NDgyLTdmMzItNGQ2ZC1iZTY2LWYzNWUyODljOTA2NyIsInVzZXJOYW1lIjoiVXNlcjAwMyIsImVtYWlsIjoidXNlcjAwM0BnbWFpbC5jb20iLCJpYXQiOjE3NDYyMzA0OTQsImV4cCI6MTc0NjgzNTI5NH0.kcpSk_xr-HLTvfUirNkk2S-aCVoDOAFBbeOpcusq-bo
//!Id de la sala1: 04ad0b7c-a2b3-4a22-a67d-7f2e5296c36d
//!Id de la ronda1: 9f8f929d-cebb-401d-83b3-038618a9aee5