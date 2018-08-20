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
      author: STRING(30),
      title: STRING(100),
      content: TEXT,
      createdAt: DATE,
      updatedAt: DATE,
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
