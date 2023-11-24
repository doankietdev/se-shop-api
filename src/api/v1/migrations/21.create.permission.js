'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permission', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(100)
      },
      api: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      method: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      permissionTypeId: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: {
          model: 'PermissionType',
          key: 'id'
        }
      },
      resourceId: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: {
          model: 'Resource',
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
    await queryInterface.dropTable('Permission')
  }
}