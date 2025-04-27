import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserToken } from "../types/types";
const accessToken = process.env.JWT_ACCESS_TOKEN

if (!accessToken) throw new Error("No se ha definido la clave secreta para JWT en las variables de entorno");

export const authenticateToken = (req: Request, _: Response, next: NextFunction): Response | any => {
  const token = req.headers.authorization?.split(" ")[1]; //* Obtenemos el token desde el encabezado de la solicitud
  console.log(req.user?.avatar);
  if(!token) {
    const error = new Error()
    error.name = 'JsonWebTokenError'
    return next(error)
  }

  jwt.verify(token, accessToken, (err, decoded) => {
    if (err) {
      const error = new Error()
      error.name = 'JsonWebTokenError'
      return next(error) 
    }

    req.user = req.user = decoded as UserToken
    next(); //* Si el token es válido, continuamos con la siguiente función de middleware
  })

}