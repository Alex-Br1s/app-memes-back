import { Router } from 'express';
import { handleCreateTemplate } from '../handlers/templateHandler';
//import { validateTemplateData } from '../middlewares/validateData';
import { authenticateToken } from '../middlewares/authenticateToken';
import multer from "multer"

const upload = multer({ dest: 'uploads/'})

const templateRouter = Router()


templateRouter.post('/create-template', upload.single('image'), /* validateTemplateData, */ authenticateToken, (req, res, next) => {
  handleCreateTemplate(req, res, next).catch(next)
})



export default templateRouter