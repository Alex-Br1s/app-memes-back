import { Router } from 'express';
import { handleCreateTemplate } from '../handlers/templateHandler';
import { validateTemplateData } from '../middlewares/validateData';
import { authenticateToken } from '../middlewares/authenticateToken';
import multer from "multer"

//* Guarda los archivos subidos en una carpeta temporal llamada uploads/ y asignales un nombre aleatorio
const upload = multer({ dest: 'uploads/'})

const templateRouter = Router()


templateRouter.post(
  '/create-template', 
  upload.single('image'), //*Lee el archivo de la request(image) y lo guarda en la carpeta uploads/ con un nombre aleatorio y añade una propiedad file al objeto req, con info del archivo subido
  validateTemplateData,
  authenticateToken, (req, res, next) => {
  handleCreateTemplate(req, res, next).catch(next)
})



export default templateRouter