const Base = require("../base.js");

module.exports = class extends Base {
  async indexAction() {
    const model = this.model('admin_category');
    const list = await model.where({status: 1}).select();
    const courses = await this.model('admin_course').where({status: 1}).field('id, title, category').select();
    const data = [];
    for(let item in list) {
      list[item].type = 'category';
      data.push(list[item])
    }

    for(let item in courses) {
      courses[item].type = 'course';
      courses[item].pid = courses[item].category;
      courses[item].name = courses[item].title;
      data.push(courses[item])
      delete courses[item].title;
    }

    return this.success(data);
  }
};
