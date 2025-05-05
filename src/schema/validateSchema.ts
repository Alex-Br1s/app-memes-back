
import { z } from "zod"

//? Schema para validar los datos de registro y login de un usuario
export const registerSchema = z.object({
  userName: z.string({
    required_error: "El nombre es obligatorio",
  })
  .min(3, "El nombre debe tener al menos 3 caracteres")
  .max(25, "El nombre no puede tener más de 25 caracteres"),
  
  email: z.string({
    required_error: "El correo es obligatorio",
  })
  .email("El correo no es válido"),

  password: z.string({
    required_error: "La contraseña es obligatoria",
  })
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
    "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo"
  ),

  confirmPassword: z.string({
    required_error: "La confirmación de contraseña es obligatoria",
  })
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
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
  memeImage: z.string().url("La url de la imagen no es válida")
});


//? Schema para validar los datos de una sala
export const createRoomSchema = z.object({
  roomName: z.string()
    .min(3, "El nombre de la sala debe tener al menos 3 caracteres")
    .max(25, "El nombre de la sala no puede tener más de 25 caracteres"),

  roomCode: z.number()
    .min(1000, "El código de la sala debe tener 4 dígitos")
    .max(9999, "El código de la sala no puede tener más de 4 dígitos")
    .optional(),

  isPublic: z.boolean().default(true),

  isSpecialRoom: z.boolean().default(false),

  rounds: z.number()
    .min(3, "El número de rondas debe ser al menos 3")
    .max(10, "El número de rondas no puede tener más de 10"),

  roundDuration: z.number().default(60),

  playAgain: z.boolean().default(false),

  isClosed: z.boolean().default(false),

  showUsernames: z.boolean().default(true),

  selectionMode: z.enum(["famousMemes", "memesIA"]).default("famousMemes"),

}).refine(data => {
  // Si la sala es pública (isPublic === true), no debe haber roomCode
  if (data.isPublic && data.roomCode !== undefined) {
    return false;
  }
  // Si la sala es privada (isPublic === false), debe haber roomCode
  if (!data.isPublic && data.roomCode === undefined) {
    return false;
  }
  return true;
}, {
  message: "Si la sala es pública, no debe tener un código. Si la sala es privada, debe tener un código.",
  path: ["roomCode"], // Se aplica sobre el campo 'roomCode'
});


export const joinRoomSchema = z.object({
  roomCode: z.number({
    invalid_type_error: "El código de la sala debe ser números"
  })
  .min(1000, "El código de la sala debe tener 4 dígitos")
  .max(9999, "El código de la sala no puede tener mas de 4 dígitos")
})


//? Schema para validar los datos de la plantilla de memes
export const createTemplateSchema = z.object({
  templateName: z.string({
    invalid_type_error: "El nombre de la plantilla es obligatorio",
  })
  .min(3, "El nombre de la plantilla debe tener al menos 3 caracteres")
  .max(100, "El nombre de la plantilla no puede tener más de 100 caracteres"),
 

  textAreas: z.string(),
 
  createdBy: z.string().optional(), 
  
  isApproved: z.string().optional(),
})

/* 
{
	"roomName": "tercera room", 
	"roomCode": "", 
	"isPublic": false, 
	"isSpecialRoom": false, 
	"rounds": 8, 
	"roundDuration": 90, 
	"showUsernames": false,
	"selectionMode": ""
}
*/