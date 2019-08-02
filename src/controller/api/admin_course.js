const BaseRest = require("../rest.js");
module.exports = class extends BaseRest {
    async getAction() {
        const where = {};
        const title = this.query('title');
        const category = this.query('category');
        console.log(title);
        if(title) {
            where['title'] = ['like', `%${title}%`]
        }
        if(category) {
            where['category'] = category;
        }

        const list = await this.modelInstance.where(where).select();
        return this.success(list);
    }
};
