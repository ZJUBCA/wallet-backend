'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {STRING, INTEGER, DATE, TEXT, DECIMAL} = Sequelize;

    await queryInterface.createTable('items', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      pic: STRING,
      type: STRING(20),     // category of the goods
      name: STRING(50),
      provider: STRING(30),  // who provides the goods, like 'Jack Ma','Alibaba'
      intro: TEXT,
      value: DECIMAL(20, 4),       // value of item, maximum amount limit is the same as eos.token, namely 2^62-1
      token: STRING(20),   // token name, the price of item is "{value} {token}",like "100.0000 EOS"
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
    await queryInterface.dropTable('items')
  }
};
