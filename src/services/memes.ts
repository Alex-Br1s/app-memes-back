import { Meme } from "../models/meme.model"
import { MemeInterface } from "../types/types"


export const getAllMemes = async (): Promise<MemeInterface[]> => {
  try {
    const allMemes = await Meme.findAll()
    if (!allMemes) {
      const error = new Error()
      error.name = "MemesNotFound"
      throw error
    }
    return allMemes
  } catch (error) {
    (error as Error).name = (error as Error).name || 'UserNotFoundError'
    throw error
  }
}