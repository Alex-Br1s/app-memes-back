declare module "express-serve-static-core" {
  interface Request {
    user?: UserToken;
  }
}
export interface UserInterface {
  id: string;
  userName: string;
  email: string;
  isPremium: boolean;
  avatar?: string;
  password: string; // No debería mandar al front
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

/* export interface UserLogin {

} */
