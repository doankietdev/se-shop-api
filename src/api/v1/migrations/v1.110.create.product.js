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
      categoryId: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING(100)
      },
      imageUrl: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      displayDetails: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      operatingSystem: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      processor: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      ram: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isPositive: (value) => {
            return value > 0
          }
        }
      },
      storage : {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isPositive: (value) => {
            return value > 0
          }
        }
      },
      dimensions: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      weight : {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          isPositive: (value) => {
            return value > 0
          }
        }
      },
      batteryCapacity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isPositive: (value) => {
            return value > 0
          }
        }
      },
      frontCameraResolution: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      rearCameraResolution  : {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      connectivity: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true
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
      stockQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0
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
    }, {
      charset: 'utf8'
    })
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product')
  }
}