'use strict'

const express = require('express')
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
  deleteRoleByIds
}= require('~/api/v1/controllers/role.controller')

const router = express.Router()

router.route('/')
  .get(getAllRoles)
  .post(createRole)
  .delete(deleteRoleByIds)

router.route('/:id')
  .get(getRoleById)
  .patch(updateRoleById)
  .delete(deleteRoleById)

module.exports = router