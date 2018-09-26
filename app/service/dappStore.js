const Service = require('egg').Service;

class DappService extends Service {
  async get(id) {
    return await this.ctx.model.Dapp.findById(id)
  }

  async getAll(page, pageSize, type = '', keywords = '') {
    const {Op} = this.app.Sequelize;
    const where = {}
    where.name = {
      [Op.like]: `%${keywords}%`
    };
    if (type !== '') {
      where.type = type
    }
    return await this.ctx.model.Dapp.findAll(
      {
        where,
        offset: (page - 1) * pageSize,
        limit: pageSize
      }
    )
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
    const dapp = await this.get(id);
    if (!dapp) {
      return null
    }

    await dapp.destroy();
    return dapp
  }
}

module.exports = DappService;