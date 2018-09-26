("use strict");

module.exports = app => {
  class SuccessController extends app.Controller {
     *index() {
      const token = this.ctx.request.header['authorization'];
      const decoded = this.service.user.getUserInfo(token);
      this.service.user.isAdmin(token);
      this.ctx.body = decoded;
    }
  }
  return SuccessController;
};