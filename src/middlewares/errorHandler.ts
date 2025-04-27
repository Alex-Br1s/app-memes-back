import type { Request, Response, NextFunction } from "express";

const ERROR_HANDLERS: Record<string, (res: Response, error: Error) => void> = {
  //* Errores de autenticación
  JsonWebTokenError: (res: Response): void => {
    res.status(401).json({
      "success": false,
      "statusCode": 401,
      "message": "Token missing or unauthorized",
      "result": 0,
      "data": null
    })
  },

  TokenExpirerError: (res: Response): void => {
    res.status(401).json({ error: "Token expired" });
  },

  SyntaxError: (res: Response): void => {
    res.status(400).json({ error: "Invalid JSON format" });
  },

  AuthRegisterError: (res: Response): void => {
    res.status(409).json({
      error: "The email already exists" ,
      statusCode: 409
    });
  },

  AuthRegisterErrorNameAlreadyExists: (res: Response): void => {
    res.status(409).json({
      error: "The username already exists",
      statusCode: 409
    });
  },

  AuthRegisterErrorPasswordNotMatch: (res: Response): void => {
    res.status(404).json({
      error: "The passwords do not match",
      statusCode: 404
    });
  },

  AuthLoginError: (res: Response): void => {
    res.status(401).json({ error: "Incorrect email or password" });
  },

  //* Errores de usuario
  UserNotFoundError: (res: Response): void => {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "User not found",
      result: 0,
      data: null
    });
  },

 /*  UsersNotFound: (res: Response): void => {
    res.status(404).json({ error: "Users not found" });
  }, */

  /* DisabledUsersNotFound: (res: Response): void => {
    res.status(404).json({ error: "Disabled users not found" });
  }, */

  //* Errores de memes
  MemesNotFound: (res: Response): void => {
    res.status(404).json({ error: "Memes not found" });
  },

  MemeNotCreated: (res: Response): void => {
    res.status(404).json({ error: "Meme not created" });
  },

  MemeAlreadyExists: (res: Response): void => {
    res.status(409).json({ error: "Meme already exists" });
  },


  //* Errores de rondas
  RoundNotFound: (res: Response): void => {
    res.status(404).json({ error: "Round not found" });
  },

  RoundNotEditing: (res: Response): void => {
    res.status(404).json({ error: "The room is not in editing" });
  },


  //* Errores de salas

  RoomNotFound: (res: Response): void => {
    res.status(404).json({ error: "Room not found" });
  },

  RoomNotCreated: (res: Response): void => {
    res.status(404).json({ error: "Room not created" });
  },

  RoomNameAlreadyExists: (res: Response): void => {
    res.status(409).json({ error: "Room name already exists" });
  },

  RoomAlreadyExistsByUser: (res: Response): void => {
    res.status(409).json({ error: "Room already exists by user" });
  },

  PlayerAlreadyInRoom: (res: Response): void => {
    res.status(409).json({ error: "Player al ready in the room" });
  },

  ErrorJoiningRoom: (res: Response): void => {
    res.status(409).json({ error: "Error joining room" });
  },

  RoomCodeNotValid: (res: Response): void => {
    res.status(409).json({ error: "Room code not valid or incorrect" });
  },

  RoomCodeRequired: (res: Response): void => {
    res.status(409).json({ error: "Room code required"})
  },
  
  RoomCodeNotAllowedInPublicRoom: (res: Response): void => {
    res.status(409).json({ error: "Room code not allowed in public room" })
  },

  defaultError: (res: Response, error: Error): void => {
    console.error('Unhandled error:', error.name);
    console.error(error);
  
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  },
  
};

export const handlerError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const handler = ERROR_HANDLERS[error.name] ?? ERROR_HANDLERS.defaultError;
  handler(res, error);
};
