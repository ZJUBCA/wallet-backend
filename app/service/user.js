
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
    async isAdmin(token){
      try{
      token = token.split(' ')[1];
      const userInfo =  app.jwt.verify(token,app.config.jwt.secret);
      const userName = userInfo.userName;
      const admin = await this.ctx.model.User.findOne({where:{userName:userName}});
      if(admin&&admin.dataValues.password===userInfo.password)return true;
      else return false;
      }catch(e){
        return false;
      }
    }
    async changePassword(userName,password,newPassword){
      const admin = await this.ctx.model.User.findOne({where:{userName:userName}});
      console.log("123");
      if(admin&&admin.dataValues.password===password){
        console.log("456");
         await admin.update({password:newPassword});
         return true;
      }
      else return false;
    }
  }
  return UserService;
}