import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserToken } from "../types/types";

const secretKey = process.env.JWT_SECRET

if (!secretKey) throw new Error("No se ha definido la clave secreta para JWT en las variables de entorno");

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | any => {
  const token = req.headers.authorization?.split(" ")[1]; //* Obtenemos el token desde el encabezado de la solicitud
  console.log(req.user?.avatar);
  if(!token) {
    return res.status(401).json({ message: "Token no proporcionado" }); //* Si no hay token, respondemos con un error 401
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({message: 'Token inválido'})  //* Verificamos el token y si es inválido, respondemos con un error 403

    req.user = req.user = decoded as UserToken
    next(); //* Si el token es válido, continuamos con la siguiente función de middleware
  })

}