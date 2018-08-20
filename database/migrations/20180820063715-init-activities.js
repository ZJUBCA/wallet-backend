'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {STRING, INTEGER, DATE} = Sequelize;

    await queryInterface.createTable('activities', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      pic: STRING,        // poster picture
      title: STRING(100), // title
      sponsor: STRING(30),  // sponsor of the activity
      abstract: STRING,   // abstract of the activity
      url: STRING,      // url to signup entrance
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
    await queryInterface.dropTable('activities')
  }
};
