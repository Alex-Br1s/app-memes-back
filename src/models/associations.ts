// models/associations.ts

import { User } from "./user.model";
import { Room } from "./room.model";
import { RoomPlayer } from "./roomPlayer.model";
import { Round } from "./round.model";
import { Prompt } from "./prompt.model";
import { Meme } from "./meme.model";
import { Template } from "./template.model";
import { SavedMeme } from "./savedMeme";
import { AssignedTemplate } from "./assignedTemplate";

export const initializeAssociations = () => {
  // 1. Un User puede crear muchas Rooms, una Room tiene un admin que es un User
  User.hasMany(Room, { foreignKey: "adminId" });
  Room.belongsTo(User, { foreignKey: "adminId", as: "roomAdmin" });

  // 2. Relación muchos a muchos entre Users y Rooms (quiénes están en qué sala)
  Room.belongsToMany(User, { through: RoomPlayer, foreignKey: "roomId" });
  User.belongsToMany(Room, { through: RoomPlayer, foreignKey: "userId" });

  // 3. Un Room tiene muchas Rounds, cada Round pertenece a una Room
  Room.hasMany(Round, { foreignKey: "roomId" });
  Round.belongsTo(Room, { foreignKey: "roomId" });

  // 4. Un User puede escribir muchos Prompts, y cada Prompt pertenece a un Round
  User.hasMany(Prompt, { foreignKey: "userId" });
  Prompt.belongsTo(User, { foreignKey: "userId" });

  Round.hasMany(Prompt, { foreignKey: "roundId" });
  Prompt.belongsTo(Round, { foreignKey: "roundId" });

  // 5. Un Round puede tener muchos Memes, pero cada Meme pertenece a un User y un Round
  Round.hasMany(Meme, { foreignKey: "roundId" });
  Meme.belongsTo(Round, { foreignKey: "roundId" });

  User.hasMany(Meme, { foreignKey: "userId" });
  Meme.belongsTo(User, { foreignKey: "userId" });

  // 6. Un User puede subir Templates personalizados (opcional)
  User.hasMany(Template, { foreignKey: "createdBy" });
  Template.belongsTo(User, { foreignKey: "createdBy" });

  // 6. Un User puede guardar muchos memes y un memes puede ser guardado por muchos usuarios
  User.belongsToMany(Meme, { through: SavedMeme, foreignKey: 'userId'});
  Meme.belongsToMany(User, { through: SavedMeme, foreignKey: 'memeId'});

  // Un usuario puede tener muchas plantillas asignadas (en distintas rondas)
  User.hasMany(AssignedTemplate, { foreignKey: "userId" });
  AssignedTemplate.belongsTo(User, { foreignKey: "userId" });

  // Una ronda tiene muchas asignaciones de plantilla
  Round.hasMany(AssignedTemplate, { foreignKey: "roundId" });
  AssignedTemplate.belongsTo(Round, { foreignKey: "roundId" });

  // Una plantilla puede ser asignada en muchas ocasiones
  Template.hasMany(AssignedTemplate, { foreignKey: "templateId" });
  AssignedTemplate.belongsTo(Template, { foreignKey: "templateId" });

};

/*
📘 EXPLICACIÓN de relaciones importantes:

- User <-> Room (RoomPlayer):
  Un usuario puede estar en varias salas y una sala puede tener varios usuarios. Esto se modela con la tabla intermedia RoomPlayer, que también puede guardar el estado del jugador (puntos, si está listo, etc).

- Room <-> Round:
  Cada sala tiene varias rondas que se van jugando.

- Round <-> Prompt:
  En cada ronda los jugadores escriben un prompt. Por eso una ronda puede tener varios prompts y cada prompt tiene un autor.

- Round <-> Meme:
  En cada ronda, se genera un meme a partir del prompt ganador. Cada meme es creado por un jugador.

- Template:
  Las plantillas pueden estar predefinidas por la app o ser creadas por los usuarios. Por eso `createdBy` puede ser null o una FK a User.
*/
