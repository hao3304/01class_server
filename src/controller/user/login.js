const Base = require("../base.js");

module.exports = class extends Base {
  async indexAction() {
    if (this.isPost) {
      const username = this.post("username");
      const password = this.post("password");

      if (!username || !password) {
        return this.fail(500, "请填写完整！");
      }

      let user = await this.model("admin_user")
        .where({ username: username, password: password })
        .find();

      if (think.isEmpty(user)) {
        return this.fail(403, "账号密码错误！请重新填写");
      } else {
        const token = this.updateAuth({name:user.username,id: user.id});
        return this.success({token}, "登录成功！");
      }
    }
  }
};
