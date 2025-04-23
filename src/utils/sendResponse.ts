import { Response } from "express";

interface SendResponseOptions {
  res: Response;
  message: string;
  data?: any;
  statusCode?: number;
  result?: number;
  success?: boolean;
}


export const sendResponse = ({res, success=true, statusCode=200, message, data = null, result = 1}: SendResponseOptions): void => {
  res.status(statusCode)
  .json({success, statusCode, message, result, data})
}