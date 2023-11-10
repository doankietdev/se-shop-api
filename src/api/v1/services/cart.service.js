'use strict'

const { Cart, CartDetail, Product } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes } = require('http-status-codes')

const createCart = async ({ userId }) => {
  return await Cart.create({ userId })
}

const getAllFullCarts = async () => {
  const fullCarts = await Cart.findAll({
    attributes: ['id', 'userId'],
    include: [
      {
        model: CartDetail,
        as: 'products',
        attributes: ['quantity'],
        include: [{
          model: Product,
          as: 'product',
          attributes: ['name', 'description', 'imageUrl', 'price']
        }]
      }
    ]
  })

  return fullCarts
}

const getFullCartByUserId = async (userId) => {
  const fullCart = await Cart.findOne({
    where: { userId },
    attributes: ['id', 'userId'],
    include: [
      {
        model: CartDetail,
        as: 'products',
        attributes: ['quantity'],
        include: [{
          model: Product,
          as: 'product',
          attributes: ['name', 'description', 'imageUrl', 'price']
        }]
      }
    ]
  })

  if (!fullCart) throw new ApiError(StatusCodes.NOT_FOUND, 'Not found cart')
  return fullCart
}

const getFullCartById = async (id) => {
  const fullCart = await Cart.findOne({
    where: { id },
    attributes: ['id', 'userId'],
    include: [
      {
        model: CartDetail,
        as: 'products',
        attributes: ['quantity'],
        include: [{
          model: Product,
          as: 'product',
          attributes: ['name', 'description', 'imageUrl', 'price']
        }]
      }
    ]
  })

  if (!fullCart) throw new ApiError(StatusCodes.NOT_FOUND, 'Not found cart')
  return fullCart
}

const addProductToCart = async ({ userId, cartId, productId, quantity }) => {
  const foundCart = await Cart.findOne({
    where: { userId, id: cartId }
  })
  if (!foundCart) throw new ApiError(StatusCodes.BAD_REQUEST, 'No carts found')

  const foundProduct = await Product.findOne({
    where: { id: productId }
  })
  if (!foundProduct) throw new ApiError(StatusCodes.BAD_REQUEST, 'No products found')

  const foundCartDetail = await CartDetail.findOne({
    where: { cartId, productId }
  })

  if (foundCartDetail) {
    const isExceedStockQuantity = foundProduct.stockQuantity < (quantity + foundCartDetail.quantity)
    if (isExceedStockQuantity) throw new ApiError(StatusCodes.BAD_REQUEST, 'Quantity in stock is not enough')
    await foundCartDetail.update({ quantity: foundCartDetail.quantity + quantity })
  } else {
    const isExceedStockQuantity = foundProduct.stockQuantity < quantity
    if (isExceedStockQuantity) throw new ApiError(StatusCodes.BAD_REQUEST, 'Quantity in stock is not enough')
    await CartDetail.create({ cartId, productId, quantity })
  }

  const fullCart = await getFullCartById(cartId)
  return {
    cartId: fullCart.id,
    products: fullCart.products
  }
}

module.exports = {
  createCart,
  getFullCartById,
  getFullCartByUserId,
  getAllFullCarts,
  addProductToCart
}