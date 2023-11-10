'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermission', {
      roleId: {
        type: Sequelize.TINYINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Role',
          key: 'id'
        }
      },
      permissionId: {
        type: Sequelize.TINYINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Permission',
          key: 'id'
        }
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    })
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RolePermission')
  }
}