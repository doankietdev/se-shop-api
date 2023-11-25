'use strict'

const Role = require('./role.model')
const Resource = require('./resource.model')
const PermissionType = require('./permission.type.model')
const Permission = require('./permission.model')
const RolePermission = require('./role.permission.model')
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
const PaymentForm = require('./payment.form.model')
const OrderStatus = require('./order.status.model')
const Order = require('./order.model')
const OrderDetail = require('./order.detail.model')
const CorsDomain = require('./cors.domain.model')

Permission.belongsTo(PermissionType, {
  foreignKey: 'permissionTypeId',
  targetKey: 'id',
  as: 'permissionType'
})

Permission.belongsTo(Resource, {
  foreignKey: 'resourceId',
  targetKey: 'id',
  as: 'resource'
})

// PermissionType.hasMany(Permission, {
//   foreignKey: 'permissionTypeId',
//   sourceKey: 'id',
//   as: 'permissions'
// })

RolePermission.belongsTo(Role, {
  foreignKey: 'roleId',
  targetKey: 'id',
  as: 'role'
})

RolePermission.belongsTo(Permission, {
  foreignKey: 'permissionId',
  targetKey: 'id',
  as: 'permission'
})

RolePermission.belongsTo(User, {
  foreignKey: 'userIdAssign',
  targetKey: 'id',
  as: 'asignedBy'
})

Role.hasMany(RolePermission, {
  foreignKey: 'roleId',
  sourceKey: 'id',
  as: 'rolePermissions'
})

User.hasMany(RolePermission, {
  foreignKey: 'userIdAssign',
  sourceKey: 'id',
  as: 'assignedPermissions'
})

Permission.hasMany(RolePermission, {
  foreignKey: 'permissionId',
  sourceKey: 'id',
  as: 'assignedFor'
})

Resource.hasMany(Permission, {
  foreignKey: 'resourceId',
  sourceKey: 'id',
  as: 'permissions'
})

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

Order.belongsTo(OrderStatus, {
  foreignKey: 'orderStatusId',
  targetKey: 'id',
  as: 'orderStatus'
})
Order.belongsTo(PaymentForm, {
  foreignKey: 'paymentFormId',
  targetKey: 'id',
  as: 'paymentForm'
})
Order.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})
Order.hasMany(OrderDetail, {
  foreignKey: 'orderId',
  sourceKey: 'id',
  as: 'products'
})

OrderDetail.belongsTo(Order, {
  foreignKey: 'orderId',
  targetKey: 'id',
  as: 'order'
})
OrderDetail.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'id',
  as: 'product'
})

module.exports = {
  Role,
  Resource,
  PermissionType,
  Permission,
  RolePermission,
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
  CartDetail,
  PaymentForm,
  OrderStatus,
  Order,
  OrderDetail,
  CorsDomain
}