// sharing defines the data structure of learning materials and documents
module.exports = app => {
  const {STRING, INTEGER, DATE, TEXT} = app.Sequelize;

  const Sharing = app.model.define('sharing', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    pic: STRING,
    author: STRING(30),
    title: STRING(100),
    content: TEXT,
    createdAt: DATE,
    updatedAt: DATE,
  });

  return Sharing;
}