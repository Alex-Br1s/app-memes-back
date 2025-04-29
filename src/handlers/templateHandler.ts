import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { createTemplate } from "../services/templateService";
import { uploadImage } from "../config/cloudinaryUpload";



export const handleCreateTemplate = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
  try {
    console.log(req.body);
    const { templateName, textAreas, createdBy, isApproved } = req.body;

    if (!req.file) {
      throw new Error('No se subió ninguna imagen');
    }

    const { resultImageUrl } = await uploadImage(req.file.path, true)

    const newTemplate = await createTemplate({
      templateName, 
      templateImage: resultImageUrl, 
      textAreas: JSON.parse(textAreas), 
      createdBy, 
      isApproved 
    })

    sendResponse({
      res,
      statusCode: 201,
      message: "Template creado con éxito",
      data: newTemplate
    })
  } catch (error) {
    next(error)
  }
}