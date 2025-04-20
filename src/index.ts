import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config()

const app = express()

const PORT =  process.env.PORT || 3001 

//* Middlewares
app.use(express.json())
app.use(cors())




app.listen(PORT, () => {
  console.log('Server listening pn port', PORT);
})

