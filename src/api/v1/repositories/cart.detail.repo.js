'use strict'

const { CartDetail } = require('~/api/v1/models')

const getCartByCartIdProductId = async ({ cartId, productId }) => {
  return await CartDetail.findOne({
    where: { cartId, productId }
  })
}

const deleteCartDetail = async ({ cartId, productId }) => {
  const foundCartDetail = await CartDetail.findOne({
    where: { cartId, productId }
  })
  if (!foundCartDetail) return null
  return await foundCartDetail.destroy()
}

module.exports = {
  getCartByCartIdProductId,
  deleteCartDetail
}