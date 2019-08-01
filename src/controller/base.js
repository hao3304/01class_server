module.exports = class extends think.Controller {
  async __before() {
    let method = this.ctx.method.toLowerCase();
    if (method === "options") {
      this.setCorsHeader();
      return;
    }
    this.setCorsHeader();
  }
  setCorsHeader() {
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  }
};
