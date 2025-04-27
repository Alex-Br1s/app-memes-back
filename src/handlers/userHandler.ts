import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser, getUserById, updateUser, /* profileSummary, */} from "../services/userService";
import { sendResponse } from "../utils/sendResponse";
import { UserToken } from "../types/types";

export const handleRegisterUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userName, email, password, confirmPassword } = req.body
    const response = await registerUser({ userName, email, password, confirmPassword })
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
    const { email, password } = req.body
    const { user, accessToken, refreshToken } = await loginUser({ email, password })
    
    // Guarda el refreshToken en una cookie segura
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // No accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS
      sameSite: 'strict', // Para evitar ataques CSRF
    });

    sendResponse({
      res,
      message: 'Usuario logueado con éxito',
      data: {
        user,
        accessToken,
      }
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


//? Advances handlers
/* 
export const handleProfileSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id || (req.user as UserToken).id
    console.log('Id que llega', userId);
    const userSummary = await profileSummary(userId)
    sendResponse({
      res,
      message: 'Resumen del usuario obtenido con éxito',
      data: userSummary
    })
  } catch (error) {
    next(error)
  }
}
 */