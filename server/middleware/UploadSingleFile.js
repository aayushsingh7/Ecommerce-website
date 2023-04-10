const cloudinary  = require('cloudinary').v2
const multer = require('multer')
const path = require('path')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.CLOUDINERY_SECRET
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/reviews'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
})

const upload = multer({ storage: storage })

const fileUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      req.cloudinary_image = null;
      return next();
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    req.cloudinary_image = result.secure_url;
    next();
  } catch (err) {
   res.status(500).send(err)
  }
}


module.exports =  {
    upload,
    fileUpload
} 
