const Order = require("../models/Order");
const Project = require("../models/Project");

exports.list = async (req, res) => {
    try {
      const user_id = req.session.userID;
      const orders = await Order.find({user_id: user_id});
      const projects = await Project.find({});
      res.render("viewOrder", { orders: orders, projects: projects });
    } catch (e) {
      res.status(404).send({ message: "could not list orders" });
    }
  };

  exports.open = async (req, res) => {
    try {
      const user_id = req.session.userID;
      const orders = await Order.find({user_id: user_id, status: 1 });
      const projects = await Project.find({});
      res.render("viewOrder", { orders: orders, projects: projects });
    } catch (e) {
      res.status(404).send({ message: "could not list orders" });
    }
  };

  exports.closed = async (req, res) => {
    try {
      const user_id = req.session.userID;
      const orders = await Order.find({user_id: user_id, status: 0});
      const projects = await Project.find({});
      res.render("viewOrder", { orders: orders, projects: projects });
    } catch (e) {
      res.status(404).send({ message: "could not list orders" });
    }
  };
  
  exports.create = async (req, res) => {
  
    try {
      const user_id = req.session.userID;
      const project_id = req.body.projectid;
      const orders = new Order({ buyer_name: req.body.name, status: 1 , project_id: project_id, user_id: user_id});
      await orders.save();
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


  exports.deliver = async (req, res) => {
  
    try {
      const id = req.params.id;
      const orders = await Order.updateOne({_id: id}, {$set: {status:0}})
      res.redirect('/viewOrder')
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

  exports.remove = async (req, res) => {
  
    try {
      const id = req.params.id;
      const orders = await Order.findByIdAndRemove(id);
      res.redirect('/viewOrder')
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


  exports.dashboard = async (req, res) => {
  
    try {
      const id = req.session.userID;
      const user = req.session.user;
      const open_orders = await Order.count({user_id: id, status: 1});
      const closed_orders = await Order.count({user_id: id, status: 0});
      res.render('index.ejs', { open_orders: open_orders, closed_orders:closed_orders, user: user})
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