import { User } from "../models/user.model";
import { UserInterface } from "../types/types";




/* export const loginUser = (data: ): Promise<UserInterface | null> => {
  try {
    const user = User.findByPk(id);
    if (!user) {
      throw new Error("DisabledUsersNotFound");
    }
    return user;
  } catch (error) {
    throw new Error((error as Error).message || "UnknownError");
  }
}; */

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
