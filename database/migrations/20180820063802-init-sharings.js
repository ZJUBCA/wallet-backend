'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {STRING, INTEGER, DATE, TEXT} = Sequelize;

    await queryInterface.createTable('sharings', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      pic: STRING,
      author: {type: STRING(30), allowNull: false},
      title: {type: STRING(100), allowNull: false},
      content: {type: TEXT, allowNull: false},
      created_at: {type: DATE, allowNull: false},
      updated_at: {type: DATE, allowNull: false}
    });

  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('sharings')
  }
};
