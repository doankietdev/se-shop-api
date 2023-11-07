'use strict'

const { User } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

// const createUser = async ({ name }) => {
//   const user = await User.create({ name })
//   if (!user) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
//   return user
// }

const getAllUsers = async () => {
  return await User.findAll()
}

const getUserById = async ({ id }) => {
  const user = await User.findByPk(id)
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return user
}

const getUserByUsername = async ({ username }) => {
  const user = await User.findOne({
    where: { username }
  })
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return user
}

// const updateUserById = async ({ id, name }) => {
//   const user = await User.findOne({
//     where: { id }
//   })
//   if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
//   return await user.update({ name })
// }

// const deleteUserById = async ({ id }) => {
//   const user = await User.findByPk(id)
//   if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
//   const { dataValues } = await user.destroy()
//   if (!dataValues) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
//   return await getAllUsers()
// }

// const deleteUserByIds = async ({ ids }) => {
//   const numberDeletedItems = await User.destroy({
//     where: { id: ids }
//   })
//   const NO_ITEMS_DELETEDS = 0
//   if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No items are deleted')
//   return await getAllUsers()
// }

module.exports = {
  // createGender,
  getAllUsers,
  getUserById,
  getUserByUsername,
  // updateGenderById,
  // deleteGenderById,
  // deleteGenderByIds
}