import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectionDB from './connection/connection'
import userRoutes from './routes/user'
import { handlerError } from './middlewares/errorHandler'


dotenv.config()

const app = express()

const PORT =  process.env.PORT || 3001 

//* Middlewares
app.use(express.json())
app.use(cors())
app.use(handlerError) //* Middleware para manejar errores

//* Conexión a la db
void connectionDB()

//* Rutas
const api = '/server'
app.use(api, userRoutes)

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
})

