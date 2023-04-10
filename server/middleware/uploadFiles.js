const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINERY_SECRET
});

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, '../uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage })
const fileUploads = (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  let imageLinks = [];


  Promise.all(
    req.files.map((file) =>
      cloudinary.uploader.upload(file.path).then((result) => {

        imageLinks.push(result.secure_url);
      })
    )
  )
    .then(() => {
      req.imageLink = imageLinks;
      next();
    })
    .catch((error) => {
      return res.status(500).json({ error: 'Something went wrong' });
    });
};

module.exports = {
  upload,
  fileUploads
}
