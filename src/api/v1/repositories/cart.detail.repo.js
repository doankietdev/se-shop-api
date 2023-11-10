'use strict'

const { CartDetail } = require('~/api/v1/models')

const getCartByCartIdProductId = async ({ cartId, productId }) => {
  return await CartDetail.findOne({
    where: { cartId, productId }
  })
}

module.exports = {
  getCartByCartIdProductId
}