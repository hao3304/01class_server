const BaseRest = require("../rest.js");
module.exports = class extends BaseRest {
  async getAction() {
    const list = await this.model('users').countSelect();
    return this.success(list);
  }
};
