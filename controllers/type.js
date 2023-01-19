const Type = require("../models/Type");

exports.list = async (req, res) => {
    try {
      const message = req.query.message;
      const types = await Type.find({});
      res.render("addProject", { types: types, message: message });
    } catch (e) {
      res.render("404", { message: "could not list types" });
    }
  };

  exports.view = async (req, res) => {
    try {
      const message = req.query.message;
      const types = await Type.find({});
      res.render("viewType", { types: types, message: message });
    } catch (e) {
      res.render("404", { message: "could not list types" });
    }
  };
  
  
  exports.create = async (req, res) => {
  
    try {
      const type = new Type({ type: req.body.name});
      await type.save();
      res.redirect('/dashboard');

    } catch (e) {
      if (e.errors) {
        res.render("404", { message: e })
        return;
      }
      return res.status(400).send({
        message: JSON.parse(e),
      });
    }
  }