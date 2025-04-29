import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectionDB from './connection/connection'
import userRoutes from './routes/userRoute'
import { handlerError } from './middlewares/errorHandler'
import memeRoutes from './routes/memeRoute'
import roomRoutes from './routes/roomRoute'
import templateRouter from './routes/templateRoute'


dotenv.config()

const app = express()

const PORT =  process.env.PORT || 3001 

//* Middlewares
app.use(express.json())
app.use(cors())

//* Conexión a la db
void connectionDB()

//* Rutas
const api = '/server'
app.use(api, userRoutes)
app.use(api, memeRoutes)
app.use(api, roomRoutes)
app.use(api, templateRouter)


app.use(handlerError) //* Middleware para manejar errores, tiene que ir debajo de todas las rutas

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
})

