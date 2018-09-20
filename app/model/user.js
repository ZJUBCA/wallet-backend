// user defines the data structure of table user which represents the administrator
module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize;
  
    const User = app.model.define('user', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      userName: {type:STRING,allowNull:false},
      password: {type: STRING, allowNull: false},
    },{timestamps:false});
  
    return User;
  };