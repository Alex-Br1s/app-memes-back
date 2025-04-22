import { CreationAttributes } from "sequelize";
import { User } from "../models/user.model";
import { UserInterface, /* UserLogin ,*/ UserRegister } from "../types/types";
import bcrypt from "bcrypt";



export const registerUser = async (data: UserRegister): Promise<Omit<UserInterface, 'password'>> => {
  try {
    const userExists = await User.findOne({ where: { email: data.email }});
    if (userExists) {
      const error = new Error('Este correo ya existe, por favor inicie sesión')
      error.name = 'AuthRegisterError'
      throw error
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser: UserRegister ={
      userName: data.userName,
      email: data.email,
      password: hashedPassword,
    }

    const createdUser = await User.create(newUser as CreationAttributes<User>)
    //* Convertimos la instancia de Sequelize en un objeto simple y quitamos el password del obj
    const { password, ...userWithoutPassword } = createdUser.get({ plain: true })

    return userWithoutPassword
  } catch (error) {
    console.error("Error al registrar usuario:", (error as any).message);
    console.error("Stack:", error);
    throw error;
  }
};

export const getUserById = (id: number): Promise<UserInterface | null> => {
  try {
    const user = User.findByPk(id);
    if (!user) {
      throw new Error("DisabledUsersNotFound");
    }
    return user;
  } catch (error) {
    throw new Error((error as Error).message || "UnknownError");
  }
};
