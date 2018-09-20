
module.exports = app => {
  class UserService extends app.Service {
    async get(userName, password) {
      const isAdmin = await this.ctx.model.User.findOne({where:{ userName: userName, password: password }});
      if (isAdmin) return true;
      return false;
    }
    getUserInfo(token){
      token = token.split(' ')[1];
      return app.jwt.verify(token,app.config.jwt.secret);
    }
  }
  return UserService;
}