const Service = require('egg').Service

class DappService extends Service {
  async get(id) {
    return await this.ctx.model.Dapp.findById(id)
  }

  async getAll(page, pageSize) {
    return await this.ctx.model.Dapp.findAll({offset: (page - 1) * pageSize, limit: pageSize})
  }

  async getAllByWhere(where, page, pageSize) {
    return await this.ctx.model.Dapp.findAll({
      where,
      offset: (page - 1) * pageSize,
      limit: pageSize
    })
  }

  async add(icon, type, name, url, author, intro, content) {
    return await this.ctx.model.Dapp.create({
      icon,
      type,
      name,
      url,
      author,
      intro,
      content
    })
  }

  async update(id, updateInfo) {
    const dapp = await this.get(id);
    if (!dapp) {
      return null
    }

    await dapp.update(updateInfo);
    return dapp
  }

  async delete(id) {
    const dapp = this.get(id);
    if (!dapp) {
      return null
    }

    await dapp.destroy();
    return dapp
  }
}

module.exports = DappService