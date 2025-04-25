import { CreationAttributes } from "sequelize";
import { Room } from "../models/room.model";
import { CreateRoomInterface, RoomInterface } from "../types/types";



export const createRoom = async ({ userId, roomName, roomCode, isPublic, isSpecialRoom, rounds, roundDuration, showUsernames, selectionMode }: CreateRoomInterface): Promise<RoomInterface> => {
  try {
    const roomExist = await Room.findOne({ where: { roomName } });
    if (roomExist) {
      const error = new Error()
      error.name = "RoomNameAlreadyExists"
      throw error
    }
    const newRoom = {
      adminId: userId,
      roomName,
      roomCode,
      isPublic,
      isSpecialRoom,
      rounds,
      roundDuration,
      phase: 'waiting',
      showUsernames,
      selectionMode
    }
    const room = await Room.create(newRoom as CreationAttributes<Room>)
    if (!room) {
      const error = new Error()
      error.name = "RoomNotCreated"
      throw error
    }
    return room
  } catch (error) {
    (error as Error).name = (error as Error).name || 'RoomNotCreated'
    throw error
  }
}