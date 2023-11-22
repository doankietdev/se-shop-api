'use strict'

const { Role } = require('~/api/v1/models')
const roleRepo = require('~/api/v1/repositories/role.repo')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createRole = async ({ name, description }) => {
  try {
    return await Role.create({ name, description })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  }
}

const getRoleById = async ({ id }) => {
  const role = await Role.findByPk(id)
  if (!role) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return role
}

const getAllRoles = async () => {
  return await Role.findAll()
}

const updateRoleById = async ({ id, name, description }) => {
  const role = await Role.findOne({
    where: { id }
  })
  if (!role) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return await role.update({ name, description })
}

const deleteRoleById = async ({ id }) => {
  const role = await Role.findByPk(id)
  if (!role) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  const { dataValues } = await role.destroy()
  if (!dataValues) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  return await roleRepo.getAllRoles()
}

const deleteRoleByIds = async ({ ids }) => {
  const numberDeletedItems = await Role.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No items are deleted')
  return await roleRepo.getAllRoles()
}

module.exports = {
  createRole,
  getRoleById,
  getAllRoles,
  updateRoleById,
  deleteRoleById,
  deleteRoleByIds
}