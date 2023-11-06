'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payment', {
      id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true
      },
      onlinePaymentServiceId: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: {
          model: 'OnlinePaymentService',
          key: 'id'
        }
      },
      paymentFormId: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: {
          model: 'PaymentForm',
          key: 'id'
        }
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      partnerCode: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          isPositive: (value) => {
            return value > 0
          }
        }
      },
      message: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      payUrl: {
        type: Sequelize.STRING(200),
        allowNull: true
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
    await queryInterface.dropTable('Payment')
  }
}