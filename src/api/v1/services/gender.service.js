'use strict'

const { Gender } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createGender = async ({ name }) => {
  const gender = await Gender.create({ name })

  if (!gender) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  return gender
}

const getAllGenders = async () => {
  return await Gender.findAll()
}

const getGenderById = async ({ id }) => {
  const gender = await Gender.findByPk(id)

  if (!gender) throw new ApiError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
  return gender
}

const updateGenderById = async ({ id, newName }) => {
  const gender = await Gender.findOne({
    where: { id }
  })

  if (!gender) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

  gender.name = newName
  return await gender.save()
}

const deleteGenderById = async ({ id }) => {
  const gender = await Gender.findByPk(id)

  if (!gender) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

  const { dataValues } = await gender.destroy()
  if (!dataValues) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  return await getAllGenders()
}

const deleteGenderByIds = async ({ ids }) => {
  const numberDeletedItems = await Gender.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No items are deleted')

  return await getAllGenders()
}

module.exports = {
  createGender,
  getAllGenders,
  getGenderById,
  updateGenderById,
  deleteGenderById,
  deleteGenderByIds
}