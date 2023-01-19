const Project = require("../models/Project");
const Type = require("../models/Type");

exports.list = async (req, res) => {
    try {
      const projects = await Project.find({});
      const types = await Type.find({});
      res.render("viewProject", { projects: projects, types:types});
    } catch (e) {
      res.render("404", { message: "could not list projects" });
    }
  };

  exports.viewById = async (req, res) => {
    try {
      const id = req.params.id;
      const types = await Type.find({});
      const projects = await Project.find({ type_id: id });
      res.render("viewProject", { projects: projects, types:types});
    } catch (e) {
      res.render("404", { message: "could not list projects" });
    }
  };

  exports.addOrder = async (req, res) => {
    try {
      const id = req.params.id;
      const projects = await Project.findById(id);
      res.render("addOrder", { projects: projects});
    } catch (e) {
      res.render("404", { message: "could not list projects" });
    }
  };

  exports.listToOrder = async (req, res) => {
    try {
      const projects = await Project.find({});
      res.render("addOrder", { projects: projects});
    } catch (e) {
      res.render("404", {message: "could not list projects" });
    }
  };
  
  
  
  exports.create = async (req, res) => {
  
    try {

      const project = new Project({ name: req.body.name, link: req.body.link ,img: req.body.picture, type_id: req.body.typelist  });
      await project.save();
      res.redirect('/dashboard');

    } catch (e) {
      if (e.errors) {
        res.render("404", { message: "could not list projects" });
      }
      return res.status(400).send({
          message: JSON.parse(e),
      });
    }
  }

  exports.remove = async (req, res) => {

    try {
      const id = req.params.id;
      const projects = await Project.findByIdAndRemove(id);
      res.redirect('viewProject')
    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        res.render("404", { errors: e.errors })
        return;
      }
      return res.status(400).send({
        message: JSON.parse(e),
      });
    }
  }