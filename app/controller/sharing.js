'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');
const {decodeRuleErr} = require('../utils');

class SharingController extends Controller {
  async get() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.SHARING_GET_RULE, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }
    const post = await service.sharing.get(ctx.params.id);
    if (!post) {
      ctx.status = 404
    } else {
      ctx.body = {
        code: 0,
        data: {
          post
        }
      }
    }
  }

  async fetch() {
    const {ctx, service} = this;
    const [page, pageSize] = [parseInt(ctx.query.page), parseInt(ctx.query.pageSize)];

    try {
      ctx.validate(rules.SHARING_FETCH_RULE, {page, pageSize});
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }
    if (page < 1) {
      throw new Error('page should not be smaller than 1')
    }
    const posts = await service.sharing.getAll(page, pageSize);
    ctx.body = {
      code: 0,
      data: {
        posts
      }
    }

  }

  async add() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    try {
      ctx.validate(rules.SHARING_ADD_RULE, body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }
    console.log("post")
    const post = await service.sharing.add(body.pic, body.author, body.title, body.content)
    if (!post) {
      throw new Error('add post failed')
    } else {
      ctx.body = {
        code: 0,
        data: {
          post
        }
      }
    }
  }

  async update() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    try {
      ctx.validate(rules.SHARING_UPDATE_RULE, body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }
    const id = parseInt(ctx.params.id);
    if (isNaN(id)) {
      throw new Error('id should be integer')
    }
    const post = await service.sharing.update(id, body.update);
    if (!post) {
      throw new Error('update failed')
    } else {
      ctx.body = {
        code: 0,
        data: {
          post
        }
      }
    }
  }

  async delete() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.SHARING_DELETE_RULE, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }

    const post = await service.sharing.delete(ctx.params.id);
    if (!post) {
      throw new Error('delete failed')
    } else {
      ctx.body = {
        code: 0
      }
    }
  }
}

module.exports = SharingController;
