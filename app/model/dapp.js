// dapp defines the data structure of basic information of a decentralized application
module.exports = app => {
  const {STRING, INTEGER, DATE, TEXT} = app.Sequelize;

  const Dapp = app.model.define('dapp', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    icon: {type: STRING, allowNull: false},      // icon of dapp
    type: {type: STRING(20), allowNull: false},   // category of dapp
    name: {type: STRING(30), allowNull: false},   // name of dapp
    url: {type: STRING, allowNull: false},        // url of dapp
    author: {type: STRING(30), allowNull: false},   // author of dapp
    intro: {type: STRING(100), allowNull: false},   // abstract intro of dapp
    content: TEXT,    // detail intro of dapp
  });

  return Dapp;
}