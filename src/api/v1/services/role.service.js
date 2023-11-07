'use strict'

const { Role } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createRole = async ({ name, description }) => {
  const role = await Role.create({ name, description })

  if (!role) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  return role
}

const getAllRoles = async () => {
  return await Role.findAll()
}

const getRoleById = async ({ id }) => {
  const role = await Role.findByPk(id)

  if (!role) throw new ApiError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
  return role
}

const updateRoleById = async ({ id, name, description }) => {
  const role = await Role.findOne({
    where: { id }
  })

  if (!role) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

  if (name) role.name = name
  if (description) role.description = description

  return await role.save()
}

const deleteRoleById = async ({ id }) => {
  const role = await Role.findByPk(id)

  if (!role) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

  const { dataValues } = await role.destroy()
  if (!dataValues) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  return await getAllRoles()
}

const deleteRoleByIds = async ({ ids }) => {
  const numberDeletedItems = await Role.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No items are deleted')

  return await getAllRoles()
}

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
  deleteRoleByIds
}