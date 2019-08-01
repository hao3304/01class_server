const BaseRest = require("../rest.js");
module.exports = class extends BaseRest {
    async getAction() {
        const list = await this.modelInstance.countSelect();
        return this.success(list);
    }
};
