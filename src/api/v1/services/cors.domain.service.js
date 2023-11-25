'use strict'

const { CorsDomain } = require('~/api/v1/models')

const getCorsDomainByDomain = async (domain = '') => {
 try { 
  console.log({ domain: domain});
  return await CorsDomain.findOne({
    where: { domain }
  })
 } catch (error) {
  console.log({ error: error.message });
 }
}

module.exports = {
  getCorsDomainByDomain
}