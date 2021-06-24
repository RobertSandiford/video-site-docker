
import Multer from 'multer'

const uploadPath = 'uploadsTemp'; // process.env.upload_path
const fileUpload = Multer({ dest: uploadPath+'/' })

export default fileUpload

export const single = fileUpload.single.bind(fileUpload)
