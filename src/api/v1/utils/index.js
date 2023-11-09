'use strict'

const _ = require('lodash')
const { Op } = require('sequelize')

const getDataInfo = (obj = {}, fields = []) => {
  return _.pick(obj, fields)
}

const convertValueToRegExOfKeyFromObject = (object = {}, flags = '') => {
  Object.keys(object).map((key) => {
    const regex = new RegExp(object[key], flags)
    object[key] = {
      [Op.regexp]: regex
    }
  })
}

const convertToQueryLikeObject = (object = {}) => {
  Object.keys(object).map((key) => {
    object[key] = {
      [Op.like]: object[key]
    }
  })
}

module.exports = {
  getDataInfo,
  convertValueToRegExOfKeyFromObject,
  convertToQueryLikeObject
}