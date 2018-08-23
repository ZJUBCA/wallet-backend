const Service = require('egg').Service;

class SharingService extends Service {
  async get(sid) {
    const sharing = this.app.sharingCache.get(sid);
    if (sharing) return sharing
    return await this.ctx.model.Sharing.findById(sid);
  }

  async getAll(page, pageSize) {
    return await this.ctx.model.Sharing.findAll({offset: (page - 1) * pageSize, limit: pageSize});
  }

  async getAllByWhere(where, page, pageSize) {
    return await this.ctx.model.Sharing.findAll({
        where,
        offset: (page - 1) * pageSize,
        limit: pageSize
      }
    )
  }

  async add(pic, author, title, content) {
    const sharing = await this.ctx.model.Sharing.create({
      pic,
      author,
      title,
      content
    });
    if (sharing) {
      this.app.sharingCache.set(sharing.id, sharing)
    }
    return sharing
  }

  async update(id, updateFields) {
    const post = await this.get(id);
    if (!post) {
      return null;
    }
    await post.update(updateFields);
    this.app.sharingCache.set(post.id, post);
    return post;
  }

  async delete(id) {
    const post = await this.get(id);
    if (!post) {
      return null;
    }
    await post.destroy();
    this.app.sharingCache.del(post.id)
    return post;
  }
}

module.exports = SharingService;