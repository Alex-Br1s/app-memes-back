declare module "express-serve-static-core" {
  interface Request {
    user?: UserToken;
  }
}
//? USER INTERFACES/TYPES
export interface UserInterface {
  id: string;
  userName: string;
  email: string;
  isPremium: boolean;
  avatar?: string;
  password: string;
}

export type UserToken = Omit<UserInterface, "password">;
export interface LoginResponse {
  user: UserToken;
  accessToken: string;
  refreshToken: string;
}

export interface LoginDataEntry {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type SaveSessionDataInDb = Omit<LoginDataEntry, "confirmPassword">
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserUpdate {
  userName: string;
  avatar?: string;
}

//? MEME INTERFACES/TYPES

export interface MemeInterface {
  id: string;
  roundId: string;
  userId: string;
  memeImage: string;
  texts: string[];
  votes: number;
}

export interface MemeResponse {
  memes: MemeInterface[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export interface MemeCreate {
  memeImage: string;
  texts: string[];
  userId: string;
  roundId: string;
}

//? ROOM INTERFACES/TYPES

export interface RoomInterface {
  id: string;
  adminId: string;
  roomName: string;
  roomCode?: number | null;
  isPublic: boolean;
  isSpecialRoom: boolean;
  rounds: number;
  roundDuration: number;
  phase: string;
  showUsernames: boolean;
  selectionMode: string;
}
export interface CreateRoomInterface {
  adminId: string;
  roomName: string;
  roomCode?: number | null;
  isPublic: boolean;
  isSpecialRoom: boolean;
  rounds: number;
  roundDuration: number;
  showUsernames: boolean;
  selectionMode: string;
}

export interface RoomWithAdminInterface extends RoomInterface {
  roomAdmin: {
    id: string
    userName: string
    avatar: string | null
    isPremium: boolean
  }
}

export interface JoinRoom {
  userId: string;
  roomId: string;
  roomCode?: number | null;
}

export type StartRoomByAdmin = Omit<JoinRoom, "roomCode">