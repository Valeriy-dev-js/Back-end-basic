'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addColumn('Tasks', 'user_uuid', {
      type: Sequelize.UUID,
      allowNull: false,
    });
    await queryInterface.addConstraint('Tasks', {
      fields: ['user_uuid'],
      type: 'foreign key',
      name: 'user_uuid',
      references: {
        table: 'Users',
        field: 'uuid'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Tasks', 'user_uuid')
    await queryInterface.dropTable('Users');
    await queryInterface.removeColumn('Tasks', 'user_uuid');
  }
};