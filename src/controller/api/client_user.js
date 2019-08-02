const BaseRest = require("../rest.js");
module.exports = class extends BaseRest {
  async getAction() {
    const page = this.query('page') || 1;
    const size = this.query('size') || 20;
    const list = await this.modelInstance.page(page, size).countSelect();
    return this.success(list);
  }

  async postAction() {
    const data = this.post();
    if (think.isEmpty(data)) {
      return this.fail("data is empty");
    }
    const insertId = await this.modelInstance.add(data);
    return this.success({ id: insertId });
  }
};
