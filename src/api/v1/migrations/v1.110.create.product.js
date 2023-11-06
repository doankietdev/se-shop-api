'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      productTypeId: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: {
          model: 'ProductType',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(100)
      },
      imageUrl: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          isPositive: (value) => {
            return value > 0
          }
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
    await queryInterface.dropTable('Product')
  }
}