'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');
const { decodeRuleErr } = require('../utils');

class DappController extends Controller {
  async get() {
    const { ctx, service } = this;
    try {
      ctx.validate(rules.DAPP_GET_RULE, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }

    const dapp = await service.dappStore.get(ctx.params.id);
    if (!dapp) {
      ctx.status = 404;
    } else {
      ctx.body = {
        code: 0,
        data: {
          dapp
        }
      }
    }
  }

  async fetch() {
    const { ctx, service } = this;
    const [page, pageSize] = [parseInt(ctx.query.page), parseInt(ctx.query.pageSize)];

    try {
      ctx.validate(rules.DAPP_FETCH_RULE, { page, pageSize });
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }

    const dapps = await service.dappStore.getAll(page, pageSize);
    ctx.body = {
      code: 0,
      data: {
        dapps
      }
    }
  }

  async add() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const token = this.ctx.request.header['authorization'];
    if (await this.service.user.isAdmin(token)) {
      try {
        ctx.validate(rules.DAPP_ADD_RULE, body);
      } catch (e) {
        throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
      }

      const dapp = await service.dappStore.add(body.icon, body.type, body.name, body.url, body.author, body.intro, body.content);
      if (!dapp) {
        throw new Error('add dapp failed')
      } else {
        ctx.body = {
          code: 0,
          data: {
            dapp
          }
        }
      }
    } else {
      this.ctx.body = {
        code: 1,
        data: {
          message: "unauthorized"
        }
      }
    }
  }

  async update() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const token = this.ctx.request.header['authorization'];
    if (await this.service.user.isAdmin(token)) {
      try {
        ctx.validate(rules.DAPP_UPDATE_RULE, body);
      } catch (e) {
        throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
      }
      const id = parseInt(ctx.params.id);
      if (isNaN(id)) {
        throw new Error('id should be integer')
      }

      const dapp = await service.dappStore.update(id, body.update);
      if (!dapp) {
        throw new Error('update failed')
      } else {
        ctx.body = {
          code: 0,
          data: {
            dapp
          }
        }
      }
    } else {
      this.ctx.body = {
        code: 1,
        data: {
          message: "unauthorized"
        }
      }
    }
  }

  async delete() {
    const { ctx, service } = this;
    const token = this.ctx.request.header['authorization'];
    if (await this.service.user.isAdmin(token)) {
      try {
        ctx.validate(rules.DAPP_DELETE_RULE, ctx.params);
      } catch (e) {
        throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
      }

      const dapp = await service.dappStore.delete(ctx.params.id);
      if (!dapp) {
        throw new Error('delete failed')
      } else {
        ctx.body = {
          code: 0,
          data: {
            dapp
          }
        }
      }
    } else {
      this.ctx.body = {
        code: 1,
        data: {
          message: "unauthorized"
        }
      }
    }
  }

}

module.exports = DappController;