'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const roleService = require('~/api/v1/services/role.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createRole = asyncHandling(async (req, res) => {
  const { name, description } = req.body

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
    metadata: await roleService.createRole({ name, description })
  }).send(res)
})

const getAllRoles = asyncHandling(async (req, res) => {
  new SuccessResponse({
    metadata: await roleService.getAllRoles()
  }).send(res)
})

const getRoleById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    metadata: await roleService.getRoleById({ id })
  }).send(res)
})

const updateRoleById = asyncHandling( async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  new SuccessResponse({
    metadata: await roleService.updateRoleById({ id, name, description })
  }).send(res)
})

const deleteRoleById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    metadata: await roleService.deleteRoleById({ id })
  }).send(res)
})

const deleteRoleByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  new SuccessResponse({
    metadata: await roleService.deleteRoleByIds({ ids })
  }).send(res)
})

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
  deleteRoleByIds
}