("use strict");

module.exports = app => {
  class SuccessController extends app.Controller {
    *index() {
      const token = this.ctx.request.header['authorization'];
      const decoded = this.service.user.getUserInfo(token);
      //const decoded = app.jwt.verify(token,app.config.jwt.secret);
      this.ctx.body = decoded;
    }
  }
  return SuccessController;
};