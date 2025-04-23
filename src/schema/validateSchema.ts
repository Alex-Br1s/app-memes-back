import { z } from "zod"

export const registerSchema = z.object({
  userName: z.string().min(3, "El nombre del usuario no puede ser menor a 3 caracteres").max(25, "El nombre de usuario no puede tener más de 25 caracteres"),
  email: z.string().email("El correo no es válido"),
  password: z.string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
    "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo"
  )

})

export const loginSchema = z.object({
  email: z.string().email("El correo no es válido"),
  password: z.string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
    "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo"
  )
})

export const updateUserSchema = z.object({
  userName: z.string().min(3, "El nombre del usuario no puede ser menor a 3 caracteres").max(25, "El nombre de usuario no puede tener más de 25 caracteres"),
  avatar: z.string().url("La url del avatar no es válida"),
})