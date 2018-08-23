// recomAct defines the data structure of recommend activities
module.exports = app => {
  const {INTEGER} = app.Sequelize;

  const RecomAct = app.model.define('recomAct', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    sid: INTEGER
  });

  return RecomAct;
}