const Order = require("../models/Order");

exports.list = async (req, res) => {
    try {
      console.log(req.query)
      const message = req.query.message;
      const orders = await Order.find({});
      res.render("orders", { orders: orders, message: message });
    } catch (e) {
      res.status(404).send({ message: "could not list orders" });
    }
  };
  
  exports.delete = async (req, res) => {
    const id = req.params.id;
  
    try {
  
      await Order.findByIdAndRemove(id);
      res.redirect("/orders");
    } catch (e) {
      res.status(404).send({
        message: `could not delete  record ${id}.`,
      });
    }
  };
  
  
  exports.create = async (req, res) => {
  
    try {
      const order = new Order({ name: req.body.name, twitter: req.body.twitter });
      await order.save();
      res.redirect('/tasters/?message=taster has been created')
    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        res.render('error', { errors: e.errors })
        return;
      }
      return res.status(400).send({
        message: JSON.parse(e),
      });
    }
  }