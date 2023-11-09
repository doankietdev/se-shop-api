'use strict'

const Role = require('./role.model')
const Permission = require('./permission.model')
const UserStatus = require('./user.status.model')
const User = require('./user.model')
const RefreshToken = require('./refresh.token.model')
const RefreshTokenUsed = require('./refresh.token.used.model')
const ResetToken = require('./reset.token.model')
const Token = require('./token.model')
const Gender = require('./gender.model')
const Category = require('./category.model')
const Product = require('./product.model')
const Cart = require('./cart.model')
const CartDetail = require('./cart.detail.model')

User.belongsTo(UserStatus, {
  foreignKey: 'userStatusId',
  targetKey: 'id',
  as: 'status'
})

User.belongsTo(Role, {
  foreignKey: 'roleId',
  targetKey: 'id',
  as: 'role'
})

User.belongsTo(Gender, {
  foreignKey: 'genderId',
  targetKey: 'id',
  as: 'gender'
})

RefreshToken.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})

RefreshTokenUsed.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})

ResetToken.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})

Token.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  targetKey: 'id',
  as: 'category'
})

Cart.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})
Cart.hasMany(CartDetail, {
  foreignKey: 'cartId',
  sourceKey: 'id',
  as: 'products'
})

CartDetail.belongsTo(Cart, {
  foreignKey: 'cartId',
  targetKey: 'id',
  as: 'cart'
})
CartDetail.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'id',
  as: 'product'
})

module.exports = {
  Role,
  Permission,
  UserStatus,
  User,
  RefreshToken,
  RefreshTokenUsed,
  ResetToken,
  Token,
  Gender,
  Category,
  Product,
  Cart,
  CartDetail
}