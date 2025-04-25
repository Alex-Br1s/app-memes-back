import { Router } from 'express'
import { handleCreateMeme, handleGetAllMemes } from '../handlers/memeHandler'
import { validateMemeData } from '../middlewares/validateData'

const memeRoutes = Router()

memeRoutes.post('/create-meme/:roundId', validateMemeData, (req, res, next) => {
  handleCreateMeme(req, res, next).catch(next)
})

memeRoutes.get('/memes', (req, res, next) => {
  handleGetAllMemes(req, res, next).catch(next)
})


export default memeRoutes