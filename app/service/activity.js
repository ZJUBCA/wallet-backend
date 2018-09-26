const Service = require('egg').Service;

class ActivityService extends Service {
  async get(id) {
    const activity = this.app.actvCache.get(id);
    if (activity) return activity;
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

  async getRecom() {
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

  async addRecom(sid, weight) {
    let recom = await this.ctx.model.RecomAct.findOrCreate({
      where: {
        sid,
        weight
      }
    });
    if (recom) {
      const actv = await this.get(sid);
      recom = {
        id: recom.id,
        weight: recom.weight,
        actv
      }
    } else {
      throw new Error("failed to add recommend activity")
    }
    return recom
  }

  async updateRecom(id, update) {
    let recom = await this.ctx.model.RecomAct.findById(id);
    if (!recom) {
      return null
    }
    if (update.sid !== recom.sid) {
      await recom.update(update);
      const actv = await this.get(update.sid);
      recom = {
        id: recom.id,
        weight: recom.weight,
        actv
      }
    }
    return recom
  }

  async deleteRecom(id) {
    const recom = await this.ctx.model.RecomAct.findById(id);
    if (!recom) {
      return null;
    }
    await recom.destroy();
    return recom
  }

  async countRecom() {
    return await this.ctx.model.RecomAct.count();
  }

}

module.exports = ActivityService;