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
  
  exports.create = async (req, res) => {
  
    try {
      const user_id = req.session.userID;
      const project_id = req.body.projectid;
      const order = new Order({ buyer_name: req.body.name, Status: 1 , project_id: project_id, user_id: user_id});
      await order.save();
      res.redirect('/')
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