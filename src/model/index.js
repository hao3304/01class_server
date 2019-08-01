module.exports = class extends think.Model {
  get schema() {
    return {
      created: {
        type: "datetime",
        default: () => think.datetime()
      }
    };
  }
};
