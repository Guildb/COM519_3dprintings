const Type = require("../models/Type");

exports.list = async (req, res) => {
    try {
      console.log(req.query)
      const message = req.query.message;
      const types = await Type.find({});
      res.render("addProject", { types: types, message: message });
    } catch (e) {
      res.status(404).send({ message: "could not list orders" });
    }
  };

  exports.view = async (req, res) => {
    try {
      console.log(req.query)
      const message = req.query.message;
      const types = await Type.find({});
      res.render("viewType", { types: types, message: message });
    } catch (e) {
      res.status(404).send({ message: "could not list orders" });
    }
  };
  
  
  exports.create = async (req, res) => {
  
    try {
      const type = new Type({ type: req.body.name});
      await type.save();
      res.redirect('/');

    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        res.render('errors', { message: e })
        return;
      }
      return res.status(400).send({
        message: JSON.parse(e),
      });
    }
  }