const BaseRest = require("../rest.js");
module.exports = class extends BaseRest {
    async getAction() {
        const list = await this.modelInstance.select();
        return this.success(list);
    }
};
