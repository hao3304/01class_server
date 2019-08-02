const Base = require("../base.js");

module.exports = class extends Base {
  async indexAction() {
    const id = this.query('id');
    if(!id) {
      return this.fail('缺少条件！')
    }
    const list = await this.model('admin_course').find(id);
    return this.success(list)
  }
};
