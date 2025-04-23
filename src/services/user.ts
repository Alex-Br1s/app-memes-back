import { CreationAttributes } from "sequelize";
import { User } from "../models/user.model";
import { LoginResponse, UserInterface, UserLogin, /* UserLogin ,*/ UserRegister, UserToken, UserUpdate } from "../types/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET
if (!secretKey) throw new Error('JWT_SECRET no está definida en las variables de entorno')

export const registerUser = async (data: UserRegister): Promise<UserToken> => {
  try {
    const userExists = await User.findOne({ where: { email: data.email }});
    if (userExists) {
      const error = new Error()
      error.name = 'AuthRegisterError'
      throw error
    }

    const userNameExists = await User.findOne({ where: {userName: data.userName }})
    if (userNameExists) {
      const error = new Error()
      error.name = 'AuthRegisterErrorNameAlreadyExists'
      throw error
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser: UserRegister = {
      userName: data.userName,
      email: data.email,
      password: hashedPassword,
    }

    const createdUser = await User.create(newUser as CreationAttributes<User>)
    //* Convertimos la instancia de Sequelize en un objeto simple y quitamos el password del obj
    const { password, ...userWithoutPassword } = createdUser.get({ plain: true })

    return userWithoutPassword
  } catch (error) {
    (error as Error).name = (error as Error).name || 'AuthRegisterError'
    throw error
  }
};

export const loginUser = async (data: UserLogin): Promise<LoginResponse> => {
  try {
    const verifyUser = await User.findOne({ where: { email: data.email }})
    if (!verifyUser) {
      const error = new Error()
      error.name = 'AuthLoginError'
      throw error
    }

    const verifyPassword = await bcrypt.compare(data.password, verifyUser.password)
    if (!verifyPassword){
      const error = new Error()
      error.name = 'AuthLoginError'
      throw error
    }
    const token = jwt.sign({id: verifyUser.id, userName: verifyUser.userName, email: verifyUser.email}, secretKey, {
      expiresIn: '7d'
    })

    const { password:_, ...userWithoutPassword } = verifyUser.get({ plain: true})
    
    return { user: userWithoutPassword, token}

  } catch (error) {
    (error as Error).name = (error as Error).name || 'AuthLoginError'
    throw error
  }
}

export const getUserById = async (id: string): Promise<UserInterface | null> => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      const error = new Error()
      error.name = 'UserNotFoundError'
      throw error
    }
    return user;
  } catch (error) {
    (error as Error).name = (error as Error).name || 'UserNotFoundError'
    throw error
  }
};

export const updateUser = async (userId: string, userData: UserUpdate): Promise<UserToken> => {
  try {
    const userToUpdate = await User.findByPk(userId)
    if(!userToUpdate) {
      const error = new Error()
      error.name = 'UserNotFoundError'
      throw error
    }
    const updatedUser = (await userToUpdate.update(userData)).get({ plain: true })
    const { password:_, ...userWithoutPassword } = updatedUser
    return userWithoutPassword
  } catch (error) {
    (error as Error).name = (error as Error).name || 'UserNotFoundError'
    throw error
  }
}
