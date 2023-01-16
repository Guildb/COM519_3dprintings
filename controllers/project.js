const Project = require("../models/Project");

exports.list = async (req, res) => {
    try {
      const message = req.query.message;
      const projects = await Project.find({});
      res.render("orders", { orders: orders, message: message });
    } catch (e) {
      res.status(404).send({ message: "could not list orders" });
    }
  };
  
  
  
  exports.create = async (req, res) => {
  
    try {

      const project = new Project({ name: req.body.name, link: req.body.link ,picture: req.body.picture, type_id: req.body.typelist  });
      await project.save();
      res.redirect('/');

    } catch (e) {
      if (e.errors) {
        res.redirect('errors', { errors: e.errors })
        return;
      }
      return res.status(400).send({
          message: JSON.parse(e),
      });
    }
  }