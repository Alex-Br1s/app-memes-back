import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: {
      id: string;
      userName: string;
      email: string;
      isPremium: boolean;
      avatar?: string;
    };
  }
}
