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

    await queryInterface.createTable('dapps', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      icon: STRING,      // icon of dapp
      type: STRING(20),   // category of dapp
      name: STRING(30),   // name of dapp
      url: STRING,         // url of dapp
      author: STRING(30),   // author of dapp
      intro: STRING(100),   // abstract intro of dapp
      content: TEXT,    // detail intro of dapp
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
    await queryInterface.dropTable('dapps')
  }
};
