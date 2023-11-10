'use strict'

const productRepo = require('~/api/v1/repositories/product.repo')

const checkProductsAvailable = async (orderProducts = []) => {
  return await Promise.all(orderProducts.map(async (orderProduct) => {
    const foundProduct = await productRepo.getProductById(orderProduct.productId)
    if (foundProduct) {
      return {
        price: foundProduct.price,
        quantity: orderProduct.quantity,
        productId: foundProduct.id
      }
    }
  }))
}

const getfullOrderProductsByIds = async (orderProducts = []) => {
  return await Promise.all(orderProducts.map(async (orderProduct) => {
    const foundProduct = await productRepo.getProductById(orderProduct.productId)

    if (foundProduct) {
      return {
        quantity: orderProduct.quantity,
        product: {
          id: foundProduct.id,
          name: foundProduct.name,
          description: foundProduct.description,
          imageUrl: foundProduct.imageUrl,
          price: foundProduct.price
        }
      }
    }
  }))
}

module.exports = {
  checkProductsAvailable,
  getfullOrderProductsByIds
}