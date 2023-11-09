'use strict'

const {
  getDataInfo,
  convertToQueryLikeObject
} = require('~/api/v1/utils')

const sortOrder = {
  asc: 1,
  desc: -1
}

const getFilterKeysFromQueryObject = (queryObject = {}) => {
  const keys = Object.keys(queryObject)
  return keys.filter((key) => key[0] !== '_')
}

const createFilter = (queryObject = {}, flags = 'gi') => {
  const filterKeys = getFilterKeysFromQueryObject(queryObject)
  const filterObject = getDataInfo(queryObject, filterKeys)

  convertToQueryLikeObject(filterObject)

  return filterObject
}

const createPagination = (queryObject = {}) => {
  const { _page = 1, _limit = 50 } = queryObject
  const skip = (Number(_page) - 1) * Number(_limit)
  return {
    skip,
    limit: Number(_limit)
  }
}

const createSorter = (queryObject = {}) => {
  const { _sort, _order } = queryObject
  const fields = _sort ? _sort.split('.') : null

  if (fields) {
    return [
      [...fields, _order]
    ]
  }
  return null
}

module.exports = {
  createFilter,
  createPagination,
  createSorter
}