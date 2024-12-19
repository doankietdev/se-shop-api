'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderHistory', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      orderId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false
        // references: {
        //   model: 'Order',
        //   key: 'id'
        // }
      },
      statusId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false
        // references: {
        //   model: 'OrderStatus',
        //   key: 'id'
        // }
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
    await queryInterface.dropTable('OrderHistory')
  }
}
