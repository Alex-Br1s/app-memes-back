import { NextFunction, Request, Response } from "express";
import { getUserById, loginUser, registerUser, updateUser, /* loginUser */ } from "../services/user";
import { sendResponse } from "../utils/sendResponse";
import { UserToken } from "../types/types";

export const handleRegisterUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log(req.body);
    const response = await registerUser(req.body)
    sendResponse({
      res, 
      message: 'Usuario registrado con éxito', 
      data: response 
    })
  } catch (error) {
    next(error)
  }
}

export const handleLoginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await loginUser(req.body)
    sendResponse({
      res,
      message: 'Usuario logueado con éxito',
      data: response
    })
  } catch (error) {
    next(error)
  }
}


export const handleGetUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await getUserById(req.params.id)
    sendResponse({
      res, 
      message: 'Usuario encontrado con éxito', 
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

export const handleUpdateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req?.user as UserToken).id
    const updatedUser = await updateUser(userId, req.body)
    sendResponse({
      res,
      message: 'Usuario actualizado con éxito',
      data: updatedUser
    })
  } catch (error) {
    next(error)
  }
}
