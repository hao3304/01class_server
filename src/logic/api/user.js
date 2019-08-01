const { checkAuth } = think.Controller.prototype;

module.exports = class extends think.Logic {
  @checkAuth(1)
  __before() {}
};
