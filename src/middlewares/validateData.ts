import { NextFunction, Request, Response } from "express";
import { createMemeSchema, createRoomSchema, joinRoomSchema, loginSchema, registerSchema, updateUserSchema } from "../schema/validateSchema";

//* Validar datos de registro y login
export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({
      error: "Error de validación",
      details: error.errors.map((e: any) => e.message),
    });
  }
}

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({
      error: "Error de validación",
      details: error.errors.map((e: any) => e.message),
    });
  }
}

//* Validar datos de usuario
export const validateUserData = (req: Request, res: Response, next: NextFunction): void => {
  try {
    updateUserSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({
      error: "Error de validación",
      details: error.errors.map((e: any) => e.message),
    });
  }
}


//* Validar datos de memes
export const validateMemeData = (req: Request, res: Response, next: NextFunction): void => {
  try {
    createMemeSchema.parse(req.body);
    next()
  } catch (error: any) {
    res.status(400).json({
      error: "Error en crear tu meme",
      details: error.errors.map((e: any) => e.message),
    });
  }
}


//* Validar datos de salas
export const validateRoomData = (req: Request, res: Response, next: NextFunction): void => {
  try {
    createRoomSchema.parse(req.body);
    next()
  } catch (error: any) {
    res.status(400).json({
      error: "Error al crear la sala",
      details: error.errors.map((e: any) => e.message),
    });
  }
}

export const validateRoomJoinData = (req: Request, res: Response, next: NextFunction): void => {
  try {
    joinRoomSchema.parse(req.body)
    next()
  } catch (error: any) {
    res.status(400).json({
      error: "Error al unirte a la sala",
      details: error.errors.map((e: any) => e.message)
    })
  }
}