import { Router } from 'express';
import { handleCreateTemplate } from '../handlers/templateHandler';

const templateRouter = Router()


templateRouter.post('/create-template', (req, res, next) => {
  handleCreateTemplate(req, res, next).catch(next)
})

