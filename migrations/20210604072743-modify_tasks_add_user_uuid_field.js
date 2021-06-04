'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'user_uuid', {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    });
    await queryInterface.removeConstraint('Tasks', 'Tasks_name_key',{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'user_uuid');
    await queryInterface.addConstraint('Tasks', 'Tasks_name_key',{})
  }
};
