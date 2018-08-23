// item defines the data structure of goods in token store
module.exports = app => {
  const {STRING, INTEGER, DATE, TEXT, DECIMAL, BOOLEAN} = app.Sequelize;

  const Item = app.model.define('item', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    pic: STRING,
    name: STRING(50),
    provider: STRING(30),  // who provides the goods, like 'Jack Ma','Alibaba'
    intro: TEXT,
    value: DECIMAL(20, 4),       // value of item, maximum amount limit is the same as eos.token, namely 2^62-1
    token: STRING(20),   // token name, the price of item is "{value} {token}",like "100.0000 EOS"
    deadline: DATE,
    createdAt: DATE,
    updatedAt: DATE,
  });

  return Item;
};