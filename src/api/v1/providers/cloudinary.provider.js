'use strict'

const cloudinary = require('~/config/cloudinary.config')

const destroyFile = async (url = '') => {
  const urls = url.split('/')
  const publicId = urls.slice(urls.length - 3).join('/').replace(/\.[^/.]+$/, '')
  await cloudinary.uploader.destroy(publicId)
}

module.exports = {
  destroyFile
}