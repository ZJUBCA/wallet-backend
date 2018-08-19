// activity defines the data structure of activites held by a specified sponsor.
module.exports = app => {
  const {STRING, INTEGER, DATE} = app.Sequelize;

  const Activity = app.model.define('activity', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    pic: STRING,        // poster picture
    title: STRING(100), // title
    sponsor: STRING(30),  // sponsor of the activity
    abstract: STRING,   // abstract of the activity
    url: STRING,      // url to signup entrance
    createdAt: DATE,
    updatedAt: DATE,
  });

  return Activity;
}