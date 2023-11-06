'use strict'

const express = require('express')
const {
  createUserStatus,
  getAllUserStatuses,
  getUserStatusById,
  updateUserStatusById,
  deleteUserStatusById,
  deleteGenderByIds
}= require('~/api/v1/controllers/user.status.controller')

const router = express.Router()

router.route('/')
  .get(getAllUserStatuses)
  .post(createUserStatus)
  .delete(deleteGenderByIds)

router.route('/:id')
  .get(getUserStatusById)
  .patch(updateUserStatusById)
  .delete(deleteUserStatusById)

module.exports = router