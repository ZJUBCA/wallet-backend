'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');
const {decodeRuleErr} = require('../utils');

class ActivityController extends Controller {
  async get() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.ACTV_GET_RULE, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message))
    }

    const actv = await service.activity.get(ctx.params.id);
    if (!actv) {
      ctx.status = 404;
    } else {
      ctx.body = {
        code: 0,
        data: {
          actv
        }
      }
    }
  }

  async fetch() {
    const {ctx, service} = this;
    const [page, pageSize] = [parseInt(ctx.query.page), parseInt(ctx.query.pageSize)];

    try {
      ctx.validate(rules.ACTV_FETCH_RULE, {page, pageSize});
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message))
    }

    const actvs = await service.activity.getAll(page, pageSize);
    ctx.body = {
      code: 0,
      data: {
        actvs
      }
    }
  }

  async add() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    try {
      ctx.validate(rules.ACTV_ADD_RULE, body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message))
    }


    const actv = await service.activity.add(body.pic, body.title, body.sponsor, body.abstract, body.url);
    if (!actv) {
      throw new Error('add activity failed')
    }
    if (body.order !== undefined) {
      await service.activity.addRecom(actv.id, body.order);
    }
    ctx.body = {
      code: 0,
      data: {
        actv
      }
    }
  }

  async update() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    try {
      ctx.validate(rules.ACTV_UPDATE_RULE, body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message))
    }

    const id = parseInt(ctx.params.id);
    if (isNaN(id)) {
      throw new Error('id should be integer');
    }

    const actv = await service.activity.update(id, body.update);
    if (!actv) {
      throw new Error('update failed')
    } else {
      ctx.body = {
        code: 0,
        data: {
          actv
        }
      }
    }
  }

  async delete() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.ACTV_DELETE_RULE, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message))
    }

    const actv = await service.activity.delete(ctx.params.id);
    if (!actv) {
      throw new Error('delete failed')
    } else {
      ctx.body = {
        code: 0,
        data: {
          actv
        }
      }
    }
  }

  async getRecoms() {
    const {ctx, service} = this;
    const recoms = await service.activity.getRecom();
    if (!recoms) {
      throw new Error('recommend activities not found');
    } else {
      ctx.body = {
        code: 0,
        data: {
          recoms
        }
      }
    }
  }

  async addRecom() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.RECOM_ACTV_ADD_RULE, ctx.request.body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message))
    }

    const {sid, weight} = ctx.request.body;
    const recom = await service.activity.addRecom(sid, weight);
    if (!recom) {
      throw new Error('add recommend activity failed');
    } else {
      ctx.body = {
        code: 0,
        data: {
          recom
        }
      }
    }
  }

  async updateRecom() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.RECOM_ACTV_UPDATE_RULE, ctx.request.body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message))
    }
    const id = parseInt(ctx.params.id);
    if (isNaN(id)) {
      throw new Error('id should be integer');
    }

    const {sid, weight} = ctx.request.body;
    const recom = await service.activity.updateRecom(id, sid, weight);
    if (!recom) {
      throw new Error('update recommend activity failed');
    } else {
      ctx.body = {
        code: 0,
        data: {
          recom
        }
      }
    }
  }

  async deleteRecom() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.RECOM_ACTV_DELETE_RULE, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message))
    }

    const id = parseInt(ctx.params.id);
    if (isNaN(id)) {
      throw new Error('id should be integer');
    }

    const recom = await service.activity.deleteRecom(id);
    if (!recom) {
      throw new Error('delete recommend activity failed');
    } else {
      ctx.body = {
        code: 0,
        data: {
          recom
        }
      }
    }
  }
}

module
  .exports = ActivityController;