import { CreationAttributes, Op } from "sequelize";
import { Room } from "../models/room.model";
import { CreateRoomInterface, RoomWithAdminInterface } from "../types/types";
import { User } from "../models/user.model";


export const createRoom = async ({ adminId, roomName, roomCode, isPublic, isSpecialRoom, rounds, roundDuration, showUsernames, selectionMode }: CreateRoomInterface): Promise<RoomWithAdminInterface> => {
  try {
    const roomExist = await Room.findOne({ where: { roomName } });
    if (roomExist) {
      const error = new Error()
      error.name = "RoomNameAlreadyExists"
      throw error
    }

    const roomExistByUser = await Room.findOne({ 
      where: {
        adminId, 
        phase: { 
          [Op.not] : 'finished' //? No permitir volver a crear si aun el estado de phase (fase) no es finished, esto permite volver a crear una sala sin "eliminar la sala"
        }
      } 
    })
    if (roomExistByUser) {
      const error = new Error()
      error.name = "RoomAlreadyExistsByUser"
      throw error
    }

    const newRoom = {
      adminId,
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

    //* obtenemos la sala con la información del admin
    const roomWithAdmin = await Room.findOne({
      where: { id: room.id },
      include: [
        {
          model: User, 
          as: 'roomAdmin', 
          attributes: ['id', 'userName', 'avatar', 'isPremium']
        }
      ]
    });

    if (!roomWithAdmin) {
      const error = new Error()
      error.name = "RoomNotFound"
      throw error
    }

    return roomWithAdmin as unknown as RoomWithAdminInterface;

  } catch (error) {
    (error as Error).name = (error as Error).name || 'RoomNotCreated'
    throw error
  }
}
