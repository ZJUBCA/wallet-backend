const Service = require('egg').Service;
const RECOM_PREFIX = '_RECOM'

class ActivityService extends Service {
  async get(id) {
    const activity = this.app.actvCache.get(id)
    if (activity) return activity
    return await this.ctx.model.Activity.findById(id);
  }

  async getAll(page, pageSize) {
    return await this.ctx.model.Activity.findAll({offset: (page - 1) * pageSize, limit: pageSize});
  }

  async add(pic, title, sponsor, abstract, url) {
    const activity = await this.ctx.model.Activity.create({
      pic,
      title,
      sponsor,
      abstract,
      url
    });

    this.app.actvCache.set(activity.id, activity);
    return activity
  }

  async update(id, updateInfo) {
    const activity = await this.get(id);
    if (!activity) {
      return null
    }
    await activity.update(updateInfo);
    this.app.actvCache.set(activity.id, activity);
    return activity
  }

  async delete(id) {
    const activity = await this.get(id);
    if (!activity) {
      return null
    }
    await activity.destroy();
    this.app.actvCache.del(activity.id)
    return activity
  }

  async getRecommand() {
    const recoms = await this.ctx.model.RecomAct.findAll();
    const Op = this.app.Sequelize.Op;
    const ids = recoms.map(item => item.sid);
    const remainIds = [];
    const activities = [];

    // get activities from cache
    ids.forEach(id => {
      let actv = this.app.actvCache.get(id);
      if (actv) {
        activities.push(actv)
      } else {
        remainIds.push(id)
      }
    });

    // get remaining activities from database
    const remainActvs = await this.ctx.model.Activity.findAll({
      where: {
        id: {
          [Op.in]: remainIds
        }
      }
    });

    return activities.concat(remainActvs)
  }

  async addRecom(sid) {
    const recom = await this.ctx.model.Activity.create({
      sid
    })
    if (recom) {
      this.app.actvCache.set(RECOM_PREFIX + recom.id, recom)
    }
    return recom
  }

  async updateRecom(id, sid) {
    const recom = this.ctx.model.RecomAct.findById(id);
    if (!recom) {
      return null
    }

    await recom.update({
      sid
    });
    this.app.actvCache.set(RECOM_PREFIX + recom.id, recom)
    return recom
  }

  async deleteRecom(id) {
    const recom = this.ctx.model.RecomAct.findById(id);
    if (!recom) {
      return null;
    }
    await recom.destroy();
    this.app.actvCache.del(recom.id)
    return recom
  }

}

module.exports = ActivityService;