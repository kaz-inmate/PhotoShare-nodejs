const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: '../public/uploads',
    filename: (req, file, cb) => {
      cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const uploader = multer({
    storage:storage,
    limits: {fileSize: 5242880}
  }).single('imageFile');


module.exports = uploader;