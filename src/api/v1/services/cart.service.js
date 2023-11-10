'use strict'

const { Cart, CartDetail, Product } = require('~/api/v1/models')
const cartDetailService = require('~/api/v1/services/cart.detail.service')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

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

const addProductToCart = async (reqBody = {}) => {
  const newCartDetail = await cartDetailService.createCartDetail(reqBody)
  if (!newCartDetail) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

  const fullCart = await getFullCartById(newCartDetail.cartId)
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