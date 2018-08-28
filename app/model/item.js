// item defines the data structure of goods in token store
module.exports = app => {
  const {STRING, INTEGER, DATE, TEXT, DECIMAL, BOOLEAN} = app.Sequelize;

  const Item = app.model.define('item', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    pic: {type: STRING, allowNull: false},
    name: {type: STRING(50), allowNull: false},
    provider: {type: STRING(30), allowNull: false},       // who provides the goods, like 'Jack Ma','Alibaba'
    intro: {type: TEXT, allowNull: false},
    value: {type: DECIMAL(20, 4), allowNull: false},      // value of item, maximum amount limit is the same as eos.token, namely 2^62-1
    token: {type: STRING(20), allowNull: false},          // token name, the price of item is "{value} {token}",like "100.0000 EOS"
    deadline: {type: DATE, allowNull: false},             // ddl for item invalid
    createdAt: {type: DATE, allowNull: false},
    updatedAt: {type: DATE, allowNull: false}
  });

  return Item;
};