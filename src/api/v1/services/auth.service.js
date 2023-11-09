'use strict'

const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const { app: { saltRounds, protocol, host, port } } = require('~/config/environment.config')
const ApiError = require('~/core/api.error')
const { User } = require('~/api/v1/models')
const { getRoleByName } = require('~/api/v1/repositories/role.repo')
const { getUserStatusByName } = require('~/api/v1/repositories/user.status.repo')
const { createUser, getUser, findOneUser, getUserById, getUserByEmail, updateUserById } = require('~/api/v1/repositories/user.repo')
const tokenRepo = require('~/api/v1/repositories/token.repo')
const refreshTokenUsedRepo = require('~/api/v1/repositories/refresh.token.used.repo')
const { createKeyPairRsa, createTokenPair, verifyToken, createResetToken } = require('~/api/v1/utils/auth.util')
const resetTokenRepo = require('~/api/v1/repositories/reset.token.repo')
const sendMail = require('~/api/v1/utils/send.mail')

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
      userId: foundUser.id,
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

const forgotPassword = async ({ email }) => {
  const foundUser = await getUserByEmail({ email })
  if (!foundUser) throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid email')

  const resetToken = createResetToken({
    payload: { userId: foundUser.id, username: foundUser.username },
    privateKey: foundUser.privateKey
  })

  await resetTokenRepo.createResetToken({
    resetToken,
    userId: foundUser.id
  })

  const serverDomain = `${protocol}://${host}:${port}`

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Forgot password</title>
        <style>
          .my-btn {
            background-color: #04aa6d;
            border: none;
            padding: 6px 12px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            border-radius: 20px;
            cursor: pointer;
            transition: 0.4s;
          }
    
          .my-btn:hover {
            background-color: rgb(233, 50, 0);
          }
        </style>
      </head>
      <body>
        <div class="message">
          <span>Reset your password: </span>
          <a
            style="color: white;"
            href="${serverDomain}/auth/reset-password?resetToken=${resetToken}"
            class="my-btn"
            >Click here!</a
          >
        </div>
      </body>
    </html>  
  `

  return await sendMail({
    from: 'SE Shop <doananhkiet0506@gmail.com>',
    email,
    subject: 'Reset password',
    html
  })
}

const resetPassword = async ({ resetToken, password }) => {
  const foundResetToken = await resetTokenRepo.getResetToken({
    where: {
      resetToken
    },
    include: [
      { model: User, as: 'user', attributes: ['id', 'publicKey'] }
    ]
  })
  if (!foundResetToken) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid reset token')
  foundResetToken.destroy()

  try {
    const decoded = verifyToken({
      token: resetToken,
      publicKey: foundResetToken.user.publicKey
    })
    if (decoded.userId !== foundResetToken.user.id) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid reset token')

    const passwordHash = await bcrypt.hash(password, saltRounds)
    const updatedUser = await updateUserById(foundResetToken.userId, { password: passwordHash })
    if (!updatedUser) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Reset password failed')

    return updatedUser
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid reset token')
  }
}

module.exports = {
  signUp,
  signIn,
  refreshToken,
  signOut,
  forgotPassword,
  resetPassword
}