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
      icon: {type: STRING, allowNull: false},         // icon of dapp
      type: {type: STRING(20), allowNull: false},     // category of dapp
      name: {type: STRING(30), allowNull: false},     // name of dapp
      url: {type: STRING, allowNull: false},          // url of dapp
      author: {type: STRING(30), allowNull: false},   // author of dapp
      intro: {type: STRING(100), allowNull: false},   // abstract intro of dapp
      content: TEXT,                                  // detail intro of dapp
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
    await queryInterface.dropTable('dapps')
  }
};
