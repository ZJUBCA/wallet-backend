const Service = require('egg').Service

class GoodsService extends Service {
  async get(id) {
    return await this.ctx.model.Item.findById(id);

  }

  async getAll(page, pageSize) {
    return await this.ctx.model.Item.findAll({offset: (page - 1) * pageSize, limit: pageSize})
  }

  async getAllByWhere(where, page, pageSize) {
    return await this.ctx.model.Item.findAll({
      where,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    })
  }

  async add(pic, name, provider, intro, value, token, deadline) {
    return await this.ctx.model.Item.create({
      pic,
      name,
      provider,
      intro,
      value,
      token,
      deadline
    })
  }

  async update(id, updateInfo) {
    const item = await this.get(id);
    if (!item) {
      return null
    }

    await item.update(updateInfo);
    return item
  }

  async delete(id) {
    const item = await this.get(id);
    if (!item) {
      return null
    }

    await item.destroy();
    return item
  }

}

module.exports = GoodsService;