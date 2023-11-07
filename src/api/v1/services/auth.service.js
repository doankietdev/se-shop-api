'use strict'

const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const { app: { saltRounds } } = require('~/config/environment.config')
const ApiError = require('~/core/api.error')
const { getRoleByName } = require('~/api/v1/repositories/role.repo')
const { getUserStatusByName } = require('~/api/v1/repositories/user.status.repo')
const { createUser, getUser } = require('~/api/v1/repositories/user.repo')
const { createKeyPairRsa } = require('~/api/v1/utils/auth.util')

const signUp = async ({
  genderId, lastName, firstName, phoneNumber,
  email, address, username, password
}) => {
  const foundUser = await getUser({
    [Op.or]: [
      { username },
      { email },
      { phoneNumber }
    ]
  })

  if (foundUser) {
    let isExist = foundUser.username === username
    if (isExist) throw new ApiError(StatusCodes.BAD_REQUEST, 'Username already exists')

    isExist = foundUser.email === email
    if (isExist) throw new ApiError(StatusCodes.BAD_REQUEST, 'Email has been used')

    isExist = foundUser.phoneNumber === phoneNumber
    if (isExist) throw new ApiError(StatusCodes.BAD_REQUEST, 'Phone number has been used')
  }

  const customerRole = await getRoleByName({ name: 'Customer' })
  if (!customerRole) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  const activeStatus = await getUserStatusByName({ name: 'Active' })
  if (!activeStatus) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

  const passwordHash = await bcrypt.hash(password, saltRounds)
  const { publicKey, privateKey } = createKeyPairRsa()

  const newUser = await createUser({
    roleId: customerRole.id,
    userStatusId: activeStatus.id,
    genderId,
    lastName,
    firstName,
    phoneNumber,
    email,
    address,
    username,
    password: passwordHash,
    publicKey,
    privateKey
  })
  if (!newUser) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

  return {
    lastName: newUser.lastName,
    firstName: newUser.firstName,
    genderId: newUser.genderId,
    phoneNumber: newUser.phoneNumber,
    email: newUser.email,
    address: newUser.address,
    username: newUser.username
  }
}

module.exports = {
  signUp
}