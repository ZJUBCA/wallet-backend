// sharing defines the data structure of information, learning materials and documents
module.exports = app => {
  const {STRING, INTEGER, DATE, TEXT} = app.Sequelize;

  const Sharing = app.model.define('sharing', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    pic: STRING,
    author: {type: STRING(30), allowNull: false},
    title: {type: STRING(100), allowNull: false},
    content: {type: TEXT, allowNull: false}
  });

  return Sharing;
};