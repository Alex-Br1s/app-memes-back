export interface UserInterface {
  id: string;
  userName: string;
  email: string;
  isPremium: boolean;
  avatar?: string;
  password: string; // No debería mandar al front
}

export type UserToken = Omit<UserInterface, "password">;

declare module "express-serve-static-core" {
  interface Request {
    user?: UserToken;
  }
}

type UserRegister = Omit<UserInterface, "id" | "avatar" | "isPremium">;

type UserLogin = Omit<
  UserInterface,
  "id" | "userName" | "isPremium" | "avatar"
>;

/* export interface UserLogin {

} */
