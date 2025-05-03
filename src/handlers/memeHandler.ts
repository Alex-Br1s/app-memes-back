import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { createMeme, getAllMemes, memesByRound } from "../services/memeService";


export const handleCreateMeme = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { texts } = req.body
    const roundId = req.params.roundId
    console.log(roundId);
    const userId = req.user?.id
    if (!userId) {
      const error = new Error()
      error.name = 'UserNotFoundError'
      throw error
    }
    

    const response = await createMeme({ texts, roundId, userId })
    sendResponse({
      res,
      message: 'Meme creado con éxito',
      data: response,
      statusCode: 201
    })

  } catch (error) {
    next(error)
  }
}


export const handleGetAllMemes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page as string || '1'
    const { memes, totalItems, totalPages, currentPage } = await getAllMemes(page);
    sendResponse({
      res,
      message: 'Memes encontrados con éxito',
      data: {
        memes,
        totalItems,
        totalPages,
        currentPage
      }
    })
  } catch (error) {
    next(error)
  }
}


export const handleMemesByRound = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roundId } = req.params

    const memes = await memesByRound(roundId)
    sendResponse({
      res,
      statusCode: 200,
      message: "Memes obtenidos con éxito",
      data: memes
    })
  } catch (error) {
    next(error)
  }
}