import cloudinary from "./cloudinary"


export const uploadImage = async (filePath:string, isOfficial: boolean) => {
  const folder = isOfficial ? 'folder/official' : 'folder/community'
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    use_filename: true, // Usa el nombre original del archivo
    unique_filename: false, // Para que el nombre sea amigable
    overwrite: false, // No sobrescribir
  })
  return { resultImageUrl: result.secure_url, publicId: result.public_id }
}