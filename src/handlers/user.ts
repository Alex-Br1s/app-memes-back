import { NextFunction, Request, Response } from "express";
import { getUserById, registerUser, /* loginUser */ } from "../services/user";


export const handleRegisterUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log(req.body);
    const response = await registerUser(req.body)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const handleGetUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await getUserById(Number(req.params.id))
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}