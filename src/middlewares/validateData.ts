import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema, updateUserSchema } from "../schema/validateSchema";


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
