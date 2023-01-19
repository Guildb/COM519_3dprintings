const Order = require("../models/Order");
const Project = require("../models/Project");
const Type = require("../models/Type");

exports.list = async (req, res) => {
  try {
    const user_id = req.session.userID;
    const orders = await Order.find({ user_id: user_id });
    const projects = await Project.find({});
    res.render("viewOrder", { orders: orders, projects: projects });
  } catch (e) {
    res.render("404", { message: "could not list orders" });
  }
};

exports.open = async (req, res) => {
  try {
    const user_id = req.session.userID;
    const orders = await Order.find({ user_id: user_id, status: 1 });
    const projects = await Project.find({});
    res.render("viewOrder", { orders: orders, projects: projects });
  } catch (e) {
    res.render("404", { message: "could not list orders" });
  }
};

exports.closed = async (req, res) => {
  try {
    const user_id = req.session.userID;
    const orders = await Order.find({ user_id: user_id, status: 0 });
    const projects = await Project.find({});
    res.render("viewOrder", { orders: orders, projects: projects });
  } catch (e) {
    res.render("404", { message: "could not list orders" });
  }
};

exports.create = async (req, res) => {

  try {
    const user_id = req.session.userID;
    const project_id = req.body.projectid;
    const orders = new Order({ buyer_name: req.body.name, status: 1, project_id: project_id, user_id: user_id });
    await orders.save();
    res.redirect('dashboard')
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


exports.deliver = async (req, res) => {

  try {
    const id = req.params.id;
    const orders = await Order.updateOne({ _id: id }, { $set: { status: 0 } })
    res.redirect('/viewOrder')
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

exports.remove = async (req, res) => {

  try {
    const id = req.params.id;
    const orders = await Order.findByIdAndRemove(id);
    res.redirect('/viewOrder')
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


exports.dashboard = async (req, res) => {

  try {
    const id = req.session.userID;
    const user = req.session.user;
    const open_orders = await Order.count({user_id: id, status: 1});
    const closed_orders = await Order.count({user_id: id, status: 0});
    const types = await Type.find();
    const projects = await Project.find({});
    const orders = await Order.find({ user_id: id,status: 0 });
    const label_list = [];
    const data_list = [];
    console.log(user);
    
    types.forEach(type => {
      let amount = 0;
      label_list.push(type.type);
      orders.forEach(order => {
        projects.forEach(project => {
          if (order.project_id == project.id && project.type_id == type.id) {
            amount += 1; 
          }
        })
      });
      data_list.push(amount);
    });
    const graph ={
      labels: label_list,
      data: data_list
    };
    
    res.render('dashboard.ejs', { open_orders: open_orders, closed_orders: closed_orders, user: user, graph:graph})
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

exports.closed = async (req, res) => {
  try {
    const user_id = req.session.userID;
    const orders = await Order.find({ user_id: user_id, status: 0 });
    const projects = await Project.find({});
    res.render("viewOrder", { orders: orders, projects: projects });
  } catch (e) {
    res.render("404", {message: "could not list orders" });
  }
};