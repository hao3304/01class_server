const Base = require("../base.js");

module.exports = class extends Base {
  async indexAction() {
    const { id } = this.ctx.state.user;
    const projectId = this.get("id");
    if (projectId) {
      let project = await this.model("project")
        .where({ user: id, id: projectId })
        .find();
      if (!think.isEmpty(project)) {
        const sections = await this.model("section")
          .where({ project: projectId })
          .select();
        project.sections = sections;
      }
      return this.success(project);
    } else {
      const project = await this.model("project")
        .where({ user: id })
        .select();
      return this.success(project);
    }
  }

  async scoreAction() {
    if (this.isPost) {
      const model = this.model("score");
      const { id } = this.ctx.state.user;
      const projectId = this.post("project");
      const data = this.post("data");
      const project = await this.model("project").find(projectId);
      if (project.user != id) {
        return this.fail(500, "项目负责人错误！");
      }
      try {
        await model.startTrans();
        await model.where({ project: projectId }).delete();

        await model.addMany(
          data.map(item => {
            return {
              project: projectId,
              user: item.user,
              section: item.section,
              value: item.value
            };
          })
        );
        await model.commit();
      } catch (e) {
        await model.rollback();
        return this.fail(e.toString());
      }

      return this.success("success");
    }
  }
};
