import { CreationAttributes } from "sequelize"
import { Meme } from "../models/meme.model"
import { MemeCreate, MemeInterface, MemeResponse } from "../types/types"
import { Round } from "../models/round.model"
import { AssignedTemplate } from "../models/assignedTemplate"
import { Template } from "../models/template.model"
import { Room } from "../models/room.model"
import { RoomPlayer } from "../models/roomPlayer.model"
import { showError } from "../utils/validateErrors"
import { User } from "../models/user.model"


export const createMeme = async ({ texts, roundId, userId }: MemeCreate): Promise<MemeInterface> => {
  try {
    const round = await Round.findByPk(roundId)
    showError(!round, 'RoundNotFound')

    const room = await Room.findByPk(round!.roomId) 
    showError(!room, 'RoomNotFound')
    
    if (round!.status !== 'editing' && room!.phase !== 'editing'){
      const error = new Error()
      error.name = 'RoomOrRoundNotEditing'
      throw error
    }

    const isPlayerInRoom = await RoomPlayer.findOne({
      where:{
        roomId: room!.id,
        userId
      }
    })
    showError(!isPlayerInRoom, 'PlayerNotInRoom')

    const assignedTemplate = await AssignedTemplate.findOne({
      where: {
        userId: userId,
        roundId
      },
      include: [Template]
    })
    showError(!assignedTemplate && !assignedTemplate!.template, 'AssignedTemplateNotFound')

    const memeImage = assignedTemplate!.template.templateImage

    const memeExist = await Meme.findOne({ where: {userId, roundId} })
    showError(memeExist, 'MemeAlreadyExists')

    const newMeme = {
      memeImage,
      texts,
      roundId,
      userId
    }
    const memeCreate = await Meme.create(newMeme as CreationAttributes<Meme>)
    showError(!memeCreate, 'MemeNotCreated')

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




export const memesByRound = async (roundId: string): Promise<MemeInterface[] | undefined> => {
  try {
    const roundExist = Round.findByPk(roundId)
    showError(!roundExist, 'RoundNotFound')

    const memes = await Meme.findAll({
      where: {
        roundId
      },
      include: [User]
    })
    console.log(memes);
    showError(!memes, 'MemesNotFound')

    return memes
  } catch (error) {
    (error as Error).name = (error as Error).name || 'MemesNotFound'
    throw error
  }
}