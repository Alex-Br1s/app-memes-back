import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { User } from '../models/user.model'
import { Room } from '../models/room.model'
import { Meme } from '../models/meme.model'
import { Prompt } from '../models/prompt.model'
import { RoomPlayer } from '../models/roomPlayer.model'
import { Round } from '../models/round.model'
import { Template } from '../models/template.model'
import { initializeAssociations } from '../models/associations'

dotenv.config()

export const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  models: [
    User,
    Room,
    Meme,
    Prompt,
    RoomPlayer,
    Round,
    Template
  ]
})

initializeAssociations()

async function connectionDB (): Promise<void> {
  try {
    await connection.authenticate()
    //* console.log('🔥 Conectado a PostgreSQL correctamente')

    await connection.sync()
    //* console.log('📦 Modelos sincronizados con la base de datos')
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error)
  }
}

export default connectionDB
