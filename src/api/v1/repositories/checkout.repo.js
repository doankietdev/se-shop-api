'use strict'

const productRepo = require('~/api/v1/repositories/product.repo')
const cartDetailRepo = require('~/api/v1/repositories/cart.detail.repo')
const { or } = require('sequelize')

const checkProductsAvailable = async (orderProducts = []) => {
  return await Promise.all(orderProducts.map(async (orderProduct) => {
    const foundProduct = await productRepo.getProductById(orderProduct.productId)
    if (!foundProduct) return null
    const isEnough = orderProduct.quantity <= foundProduct.stockQuantity
    if (isEnough) {
      return {
        price: foundProduct.price,
        quantity: orderProduct.quantity,
        productId: foundProduct.id
      }
    }
  }))
}

const checkOrderProductsWithCart = async (cartId, userId, orderProducts = []) => {
  return await Promise.all(orderProducts.map(async (orderProduct) => {
    const foundCartDetail = await cartDetailRepo.getCartByCartIdProductId({
      productId: orderProduct.productId,
      cartId
    })
    if (!foundCartDetail) return null

    const isOrderingExceedProductQuantityInCart =
      orderProduct.quantity > foundCartDetail.quantity

    if (isOrderingExceedProductQuantityInCart) return null

    return {
      quantity: orderProduct.quantity,
      productId: foundCartDetail.productId
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
  checkOrderProductsWithCart,
  getfullOrderProductsByIds
}