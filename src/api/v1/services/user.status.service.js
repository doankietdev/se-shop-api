'use strict'

const { UserStatus } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createUserStatus = async ({ name }) => {
  const userStatus = await UserStatus.create({ name })
  if (!userStatus) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  return userStatus
}

const getAllUserStatuses = async () => {
  return await UserStatus.findAll()
}

const getUserStatusById = async ({ id }) => {
  const userStatus = await UserStatus.findByPk(id)
  if (!userStatus) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return userStatus
}

const updateUserStatusById = async ({ id, name }) => {
  const userStatus = await UserStatus.findOne({
    where: { id }
  })
  if (!userStatus) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return await userStatus.update({ name })
}

const deleteUserStatusById = async ({ id }) => {
  const userStatus = await UserStatus.findByPk(id)
  if (!userStatus) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  const { dataValues } = await userStatus.destroy()
  if (!dataValues) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  return await getAllUserStatuses()
}

const deleteUserStatusByIds = async ({ ids }) => {
  const numberDeletedItems = await UserStatus.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No items are deleted')
  return await getAllUserStatuses()
}

module.exports = {
  createUserStatus,
  getAllUserStatuses,
  getUserStatusById,
  updateUserStatusById,
  deleteUserStatusById,
  deleteUserStatusByIds
}