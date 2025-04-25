import { z } from "zod"

//? Schema para validar los datos de registro y login de un usuario
export const registerSchema = z.object({
  userName: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(25, "El nombre no puede tener más de 25 caracteres"),
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

//? Schema para validar los datos de un usuario
export const updateUserSchema = z.object({
  userName: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(25, "El nombre de usuario no puede tener más de 25 caracteres"),
  avatar: z.string().url("La url del avatar no es válida"),
})


//? Schema para validar los datos de un meme


export const createMemeSchema = z.object({
  texts: z.array( z.string().max(50, "Cada texto del meme debe tener como máximo 50 caracteres"))
    .max(5, "No se permiten más de 5 textos")
    .optional(), // hace que el campo texts sea opcional
});
