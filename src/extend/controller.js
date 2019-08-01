const jsonwebtoken = require("jsonwebtoken");
module.exports = {
  authFail() {
    return this.fail(500, "没有权限");
  },

  checkAuth(admin) {
    return (target, name, descriptor) => {
      const action = descriptor.value;
      descriptor.value = function() {
        console.log(this.ctx.state.user);
        const userName = this.ctx.state.user && this.ctx.state.user.name;
        if (!userName) {
          return this.authFail();
        } else if (admin && this.ctx.state.user.admin != admin) {
          return this.authFail();
        }
        this.updateAuth(this.ctx.state.user);
        return action.apply(this, arguments);
      };
      return descriptor;
    };
  },

  updateAuth(userInfo) {
    delete userInfo["exp"];
    delete userInfo["iat"];
    const { secret, cookie, expire } = this.config("jwt");
    const token = jsonwebtoken.sign(userInfo, secret, { expiresIn: expire });
    this.cookie(cookie, token);
    return token;
  }
};
