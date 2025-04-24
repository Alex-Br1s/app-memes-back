import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { getAllMemes } from "../services/memes";



export const handleGetAllMemes = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const memes = await getAllMemes()
    sendResponse({
      res,
      message: 'Memes encontrados con éxito',
      data: memes
    })
  } catch (error) {
    next(error)
  }
}