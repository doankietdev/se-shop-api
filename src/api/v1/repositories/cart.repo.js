'use strict'

const { Cart } = require('~/api/v1/models')

const getCartByCartIdUserId = async ({ cartId, userId }) => {
  return await Cart.findOne({
    where: { userId, id: cartId }
  })
}

module.exports = {
  getCartByCartIdUserId
}