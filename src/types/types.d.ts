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
  token: string;
}

type UserRegister = Omit<UserInterface, "id" | "avatar" | "isPremium">;

type UserLogin = Omit<UserInterface, "id" | "avatar" | "userName" | "isPremium">;
export interface UserUpdate {
  userName: string;
  avatar?: string;
}

//? MEME INTERFACES/TYPES

export interface MemeInterface {
  id: string;
  roundId: string;
  userId: string;
  imageUrl: string;
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
  imageUrl: string;
  texts: string[];
  userId: string;
  roundId: string;
}