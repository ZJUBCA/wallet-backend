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
      pic: STRING,                                      // poster picture
      title: {type: STRING(100), allowNull: false},     // title
      sponsor: {type: STRING(30), allowNull: false},    // sponsor of the activity
      abstract: STRING,                                 // abstract of the activity
      url: {type: STRING, allowNull: false},            // url to signup entrance
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
    await queryInterface.dropTable('activities')
  }
};
