'use strict'

const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const { app: { saltRounds } } = require('~/config/environment.config')
const ApiError = require('~/core/api.error')
const { getRoleByName } = require('~/api/v1/repositories/role.repo')
const { getUserStatusByName } = require('~/api/v1/repositories/user.status.repo')
const { createUser, getUser, findOneUser, getUserById } = require('~/api/v1/repositories/user.repo')
const tokenRepo = require('~/api/v1/repositories/token.repo')
const refreshTokenUsedRepo = require('~/api/v1/repositories/refresh.token.used.repo')
const { createKeyPairRsa, createTokenPair, verifyToken } = require('~/api/v1/utils/auth.util')

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

const signIn = async ({ username, password }) => {
  const foundUser = await findOneUser({
    attributes: {
      exclude: ['roleId', 'userStatusId', 'createdAt', 'updatedAt']
    },
    where: { username }
  })
  if (!foundUser) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  const match = await bcrypt.compare(password, foundUser.password)
  if (!match) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  const { accessToken, refreshToken } = createTokenPair({
    payload: { userId: foundUser.id, username: foundUser.username },
    privateKey: foundUser.privateKey
  })

  const token = await tokenRepo.createToken({ accessToken, refreshToken, userId: foundUser.id })
  if (!token) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

  return {
    user: {
      lastName: foundUser.lastName,
      firstName: foundUser.firstName,
      username: foundUser.username
    },
    accessToken: token.accessToken,
    refreshToken: token.refreshToken
  }
}

const refreshToken = async ({ userId, refreshToken }) => {
  // automatically detect illegally stolen refresh token
  const foundRefreshTokenUsed = await refreshTokenUsedRepo.getRefreshTokenUsed({ refreshToken })
  if (foundRefreshTokenUsed) {
    await tokenRepo.deleteAll()
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Something unusual happened')
  }

  const foundUser = await getUserById({ id: userId })
  if (!foundUser) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  try {
    const decoded = verifyToken({ token: refreshToken, publicKey: foundUser.publicKey })
    if (decoded.userId !== userId) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

    const deletedToken = await tokenRepo.deleteTokenByRefreshToken({ refreshToken })
    if (!deletedToken) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

    await refreshTokenUsedRepo.createRefreshTokenUsed({
      refreshTokenUsed: deletedToken.refreshToken,
      userId: deletedToken.userId
    })

    const tokenPair = createTokenPair({
      payload: { userId: foundUser.id, username: foundUser.username },
      privateKey: foundUser.privateKey
    })

    const token = await tokenRepo.createToken({
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
      userId
    })

    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken
    }
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, error.message)
  }
}

const signOut = async ({ accessToken, refreshToken }) => {
  const token = await tokenRepo.findOneToken({
    where: { accessToken, refreshToken }
  })
  if (!token) throw new ApiError(StatusCodes.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
  return await token.destroy()
}

module.exports = {
  signUp,
  signIn,
  refreshToken,
  signOut
}