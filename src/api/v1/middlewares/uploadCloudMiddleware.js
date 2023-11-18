const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const cloudinary = require('~/config/cloudinary.config')

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  params: {
    folder: 'se-shop/avatars'
  }
})

const productStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  params: {
    folder: 'se-shop/products'
  }
})

module.exports = {
  uploadAvatar: multer({ storage: avatarStorage }),
  uploadProduct: multer({ storage: productStorage })
}
