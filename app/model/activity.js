// activity defines the data structure of activites held by a specified sponsor.
module.exports = app => {
  const {STRING, INTEGER, DATE} = app.Sequelize;

  const Activity = app.model.define('activity', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    pic: STRING,        // poster picture
    title: {type: STRING(100), allowNull: false},// title
    sponsor: {type: STRING(30), allowNull: false}, // sponsor of the activity
    abstract: STRING,   // abstract of the activity
    url: {type: STRING, allowNull: false},     // url to signup entrance
  });

  return Activity;
};