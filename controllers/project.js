const Project = require("../models/Project");

exports.list = async (req, res) => {
    try {
      const projects = await Project.find({});
      res.render("viewProject", { projects: projects});
    } catch (e) {
      res.status(404).send({ message: "could not list projects" });
    }
  };

  exports.viewById = async (req, res) => {
    try {
      const id = req.params.id;
      const projects = await Project.find({ type_id: id });
      res.render("viewProject", { projects: projects});
    } catch (e) {
      res.status(404).send({ message: "could not list projects" });
    }
  };

  exports.listToOrder = async (req, res) => {
    try {
      const projects = await Project.find({});
      res.render("addOrder", { projects: projects});
    } catch (e) {
      res.status(404).send({ message: "could not list projects" });
    }
  };
  
  
  
  exports.create = async (req, res) => {
  
    try {

      const project = new Project({ name: req.body.name, link: req.body.link ,img: req.body.picture, type_id: req.body.typelist  });
      await project.save();
      res.redirect('/');

    } catch (e) {
      if (e.errors) {
        res.status(404).send({ message: "could not list projects" });
      }
      return res.status(400).send({
          message: JSON.parse(e),
      });
    }
  }