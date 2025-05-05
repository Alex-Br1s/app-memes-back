import { CreationAttributes, Op } from "sequelize";
import { Room } from "../models/room.model";
import { CreateRoomInterface, JoinRoom, RandomTemplates, RoomWithAdminInterface, StartRoomByAdmin, TemplateFromUsers } from "../types/types";
import { User } from "../models/user.model";
import { RoomPlayer } from "../models/roomPlayer.model";
import { Round } from "../models/round.model";
import { Template } from "../models/template.model";
import { AssignedTemplate } from "../models/assignedTemplate";
import { io } from "../index";
import { showError } from "../utils/validateErrors";


export const createRoom = async ({ adminId, roomName, roomCode, isPublic, isSpecialRoom, rounds, showUsernames, selectionMode }: CreateRoomInterface): Promise<RoomWithAdminInterface> => {
  try {
    const roomExist = await Room.findOne({ where: { roomName } });
    showError(roomExist, "RoomNameAlreadyExists")
     

    const roomExistByUser = await Room.findOne({ 
      where: {
        adminId, 
        phase: { 
          [Op.not] : 'finished' //? No permitir volver a crear si aun el estado de phase (fase) no es finished, esto permite volver a crear una sala sin "eliminar la sala"
        },
        isClosed: false
      } 
    })
    showError(roomExistByUser, 'RoomAlreadyExistsByUser')
    
    const newRoom = {
      adminId,
      roomName,
      roomCode,
      isPublic,
      isSpecialRoom,
      rounds,
      phase: 'waiting',
      playAgain: false,
      isClosed: false,
      showUsernames,
      selectionMode
    }

    const room = await Room.create(newRoom as CreationAttributes<Room>)

    showError(!room, "RoomNotCreated")

    //* obtenemos la sala con la información del admin
    const roomCreated = await Room.findOne({
      where: { id: room.id },
      include: [
        {
          model: User, 
          as: 'roomAdmin', 
          attributes: ['id', 'userName', 'avatar', 'isPremium']
        }
      ]
    });
    showError(!roomCreated, "RoomNotFound")
    
    await RoomPlayer.create({
      roomId: room.id,
      userId: adminId,
      joinedAt: new Date()
    } as CreationAttributes<RoomPlayer>)

    return roomCreated as unknown as RoomWithAdminInterface;

  } catch (error) {
    (error as Error).name = (error as Error).name || 'RoomNotCreated'
    throw error
  }
}


export const joinRoom = async ({ userId, roomId, roomCode }: JoinRoom) => {
  try {
    const roomExist = await Room.findByPk(roomId)
    if (!roomExist) {
      const error = new Error()
      error.name = "RoomNotFound"
      throw error
    }
    if(roomExist.isPublic === false && roomExist.roomCode !== roomCode) {
      const error = new Error()
      error.name = "RoomCodeNotValid"
      throw error
    }

    const playerIsInRoom = await RoomPlayer.findOne({ where: { userId, roomId } })
    if (playerIsInRoom) {
      const error = new Error()
      error.name = "PlayerAlreadyInRoom"
      throw error
    }

    const playerJoin = await RoomPlayer.create({
      userId,
      roomId,
      joinedAt: new Date(),
    } as CreationAttributes<RoomPlayer>)

    return playerJoin
  } catch (error) {
    (error as Error).name = (error as Error).name || 'ErrorJoiningRoom'
    throw error
  }
}

export const startRoom = async ({ roomId, userId }: StartRoomByAdmin):Promise<any> => {
  try {
    const roomExist = await Room.findByPk(roomId)
    showError(!roomExist, "RoomNotFound")

    showError(roomExist!.adminId !== userId, "RoomNotAdmin")
     
    showError (roomExist!.phase !== 'waiting', "RoomAlreadyStarted")

    const playersInRoom = await RoomPlayer.findAll({
      where: {
        roomId,
        leftAt: null as any
      }
    })

    showError(playersInRoom.length < 2, 'MinimumTwoPlayersToStartRoom')

    await roomExist?.update({ phase: 'assigning' })

    const newRound = await Round.create({
      roomId: roomExist?.id,
      status: 'assigning',
      roundNumber: 1
    } as CreationAttributes<Round>)

    return {
      room: roomExist,
      round: newRound
    }
  } catch (error) {
    (error as Error).name = (error as Error).name || 'StartRoomError'
    throw error
  }
}

export const assignTemplatesToPlayers = async ({ roomId, roundId, userId }: RandomTemplates): Promise<void> => {
  try {
    const room = await Room.findByPk(roomId);
    showError(!room, "RoomNotFound");
  
    // Solo el admin puede ejecutar esta acción (en realidad solo ejecuta el start de la sala)
    showError(room?.adminId !== userId, "RoomNotAdmin");
  
    showError(room?.phase !== "assigning", "RoomNotInAssigningPhase");
  
    const round = await Round.findByPk(roundId);
    showError(!round, "RoundNotFound");
  
    const players = await RoomPlayer.findAll({ where: { roomId } });

    const templates = await Template.findAll();

    // Mezclamos aleatoriamente las plantillas
    const shuffledTemplates = templates.sort(() => Math.random() - 0.5);
  
    // Asignamos una plantilla a cada jugador y la guardamos
    await Promise.all(
      players.map((player, index) => {
        return AssignedTemplate.create({
          userId: player.userId,
          roundId,
          templateId: shuffledTemplates[index].id,
        } as CreationAttributes<AssignedTemplate>);
      })
    );
  
    // Cambiamos el estado de la sala y la ronda a "editing"
    await room!.update({ phase: "editing" });
    await round!.update({ status: "editing" });
  
    // Emitimos a los jugadores que las plantillas ya fueron asignadas
    io.to(roomId).emit("templates-assigned");
    
  } catch (error) {
    (error as Error).name = (error as Error).name || 'ErrorJoiningRoom'
    throw error
  }
};

export const getTemplateFromUser = async (roundId: string, userId: string): Promise<TemplateFromUsers> => {
  try {
    const roundExists = await Round.findByPk(roundId)
    showError(!roundExists, 'RoundNotFound')

    const templatesUsers = await AssignedTemplate.findOne({
      where:{
        roundId,
        userId
      },
      include: [Template]
    })
    showError(!templatesUsers, 'AssignedTemplateNotFound')
    console.log(templatesUsers);
    return templatesUsers!
  } catch (error) {
    (error as Error).name = (error as Error).name || 'AssignedTemplateNotFound'
    throw error
  }
}

