import type { Request, Response, NextFunction } from "express";

const ERROR_HANDLERS: Record<string, (res: Response, error: Error) => void> = {
  
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

  AuthLoginError: (res: Response): void => {
    res.status(401).json({ error: "Incorrect email or password" });
  },

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

  DisabledUsersNotFound: (res: Response): void => {
    res.status(404).json({ error: "Disabled users not found" });
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
