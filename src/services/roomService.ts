import { CreationAttributes, Op } from "sequelize";
import { Room } from "../models/room.model";
import { CreateRoomInterface, JoinRoom, RandomTemplates, RoomWithAdminInterface, StartRoomByAdmin } from "../types/types";
import { User } from "../models/user.model";
import { RoomPlayer } from "../models/roomPlayer.model";
import { Round } from "../models/round.model";
import { Template } from "../models/template.model";
import { AssignedTemplate } from "../models/assignedTemplate";
import { io } from "../index";


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
      score: 0,
      isWinner: false,
      isReady: false,
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
    if (!roomExist) {
      const error = new Error()
      error.name = "RoomNotFound"
      throw error
    }
    if (roomExist.adminId !== userId) {
      const error = new Error()
      error.name = "RoomNotAdmin"
      throw error
    }
    if (roomExist.phase !== 'waiting') {
      const error = new Error()
      error.name = "RoomAlreadyStarted"
      throw error
    }

    const roomStarted = await roomExist.update({ phase: 'editing' })

    return roomStarted
  } catch (error) {
    (error as Error).name = (error as Error).name || 'ErrorJoiningRoom'
    throw error
  }
}

export const getRandomTemplates = async ({ roomId, roundId, userId }: RandomTemplates) => {
  
  // Buscamos la sala
  const room = await Room.findByPk(roomId);
  if (!room) throw new Error("RoomNotFound");

  // Solo el admin puede ejecutar esta acción
  if (room.adminId !== userId) throw new Error("RoomNotAdmin");

  // Validamos la fase correcta
  if (room.phase !== "assigning") throw new Error("RoomNotInAssigningPhase");

  // Buscamos la ronda
  const round = await Round.findByPk(roundId);
  if (!round) throw new Error("RoundNotFound");

  // Buscamos los jugadores de la sala
  const players = await RoomPlayer.findAll({ where: { roomId } });

  // Buscamos todas las plantillas disponibles
  const templates = await Template.findAll();

  // Validamos que haya suficientes plantillas
  if (templates.length < players.length) throw new Error("NotEnoughTemplates");

  // Mezclamos aleatoriamente las plantillas
  const shuffledTemplates = templates.sort(() => Math.random() - 0.5);

  // Asignamos una plantilla a cada jugador y la guardamos

  const assignments = await Promise.all(
    players.map((player, index) => {
      return AssignedTemplate.create({
        userId: player.userId,
        roundId,
        templateId: shuffledTemplates[index].id,
      } as CreationAttributes<AssignedTemplate>);
    })
  );

  // Cambiamos el estado de la sala y la ronda a "editing"
  await room.update({ phase: "editing" });
  await round.update({ status: "editing" });

  // Emitimos a los jugadores que las plantillas ya fueron asignadas
  io.to(roomId).emit("templates-assigned");

  return assignments;
};
