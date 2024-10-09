import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/temp'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4(); 
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  } 
});


const fileFilter = (req, file, cb) => {

  const filetypes = /pdf|jpg|jpeg|png/;
  const extname = filetypes.test(file.originalname.toLowerCase()); 
  const mimetype = filetypes.test(file.mimetype); 

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed!'), false);
  }
};

// Multer configuration
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: fileFilter,
});
