import { CreationAttributes } from "sequelize"
import { Meme } from "../models/meme.model"
import { MemeCreate, MemeInterface, MemeResponse } from "../types/types"
import { Round } from "../models/round.model"


export const createMeme = async ({imageUrl, texts, roundId, userId}: MemeCreate): Promise<MemeInterface> => {
  try {
    const round = await Round.findByPk(roundId)

    if (!round) {
      const error = new Error()
      error.name = "RoundNotFound"
      throw error
    }

    if (round.status !== 'editing') {
      const error = new Error()
      error.name = "RoundNotEditing"
      throw error
    }

    const memeExist = await Meme.findOne({ where: {userId, roundId} })
    if (memeExist) {
      const error = new Error()
      error.name = "MemeAlreadyExists"
      throw error
    }

    const newMeme = {
      imageUrl: imageUrl,
      texts: texts || [],
      roundId: roundId,
      userId: userId
    }
    const memeCreate = await Meme.create(newMeme as CreationAttributes<Meme>)
    if (!memeCreate) {
      const error = new Error()
      error.name = "MemeNotCreated"
      throw error
    }

    return memeCreate
  } catch (error) {
    (error as Error).name = (error as Error).name || 'MemeNotCreated'
    throw error
  }
}


export const getAllMemes = async (page: string): Promise<MemeResponse> => {
  try {
    const limit = 10
    const from = (Number(page) - 1) * limit //? desde donde arranca  0, 9, 10, 19, etc
    const {rows: memes, count: totalItems} = await Meme.findAndCountAll({
      limit,
      offset: from,
      order: [['createdAt', 'DESC']]
    })
    const totalPages = Math.ceil(totalItems / limit)
    if (!memes) {
      const error = new Error()
      error.name = "MemesNotFound"
      throw error
    }
    return { memes, totalPages, totalItems, currentPage: Number(page) }
  } catch (error) {
    (error as Error).name = (error as Error).name || 'MemesNotFound'
    throw error
  }
}


