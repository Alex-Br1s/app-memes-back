import { Router } from 'express'
import { handleGetAllMemes } from '../handlers/meme'

const memeRoutes = Router()

memeRoutes.get('/memes', (req, res, next) => {
  handleGetAllMemes(req, res, next).catch(next)
})

export default memeRoutes