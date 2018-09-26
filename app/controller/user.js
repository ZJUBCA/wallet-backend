'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');
const { decodeRuleErr } = require('../utils');
module.exports = app => {
  class UserController extends Controller {
    async getToken() {
      const { ctx, service } = this;
      try {
        //   ctx.validate(rules.SIGN_USERINFO_RULE, ctx.params);
      } catch (e) {
        throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
      }
      const isAdmin=await service.user.get(ctx.request.body.userName, ctx.request.body.password);
      if (isAdmin) {
        const token = app.jwt.sign({ userName: ctx.request.body.userName, password: ctx.request.body.password }, app.config.jwt.secret);
        ctx.body = {
          code: 0,
          data: {
            access_token: token
          }
        }
      } else {
        ctx.status = 404;
      }
    }
  }
  return UserController;
}