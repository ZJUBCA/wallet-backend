// dapp defines the data structure of basic information of a decentralized application
module.exports = app => {
  const {STRING, INTEGER, DATE, TEXT} = app.Sequelize;

  const Dapp = app.model.define('dapp', {
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

  return Dapp;
}