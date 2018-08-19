// info define the data structure of information
module.exports = app => {
  const {STRING, INTEGER, DATE, TEXT} = app.Sequelize;

  const Info = app.model.define('info', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    title: STRING(100),
    content: TEXT,
    createdAt: DATE,
    updatedAt: DATE,
  });

  return Info;
}