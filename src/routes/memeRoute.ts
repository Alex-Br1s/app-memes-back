import { Router } from 'express'
import { handleCreateMeme, handleGetAllMemes, handleMemesByRound } from '../handlers/memeHandler'
import { authenticateToken } from '../middlewares/authenticateToken'
//import { validateMemeData } from '../middlewares/validateData'

const memeRoutes = Router()

memeRoutes.post('/create-meme/:roundId', authenticateToken, /* validateMemeData, */ (req, res, next) => {
  handleCreateMeme(req, res, next).catch(next)
})

memeRoutes.get('/memes', (req, res, next) => {
  handleGetAllMemes(req, res, next).catch(next)
})

memeRoutes.get('/memes/:roundId', (req, res, next) => {
  handleMemesByRound(req, res, next).catch(next)
})

memeRoutes.post('memes/:roundId/')

export default memeRoutes