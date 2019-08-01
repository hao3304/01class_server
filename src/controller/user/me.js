const Base = require("../base.js");

module.exports = class extends Base {
  async indexAction() {
    this.success({
      me: this.ctx.state.user
    });
  }
};
