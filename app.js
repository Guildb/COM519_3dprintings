
require("dotenv").config();
const express = require("express"),
      path = require("path"),
      mongoose = require("mongoose"),
      chalk = require("chalk"),
      bodyParser = require("body-parser"),
      expressSession = require("express-session"),
      User = require("./models/User"),
      Order = require("./models/Order"),
      Type = require("./models/Type"),
      Project = require("./models/Project")

/**
 * Controllers (route handlers).
 */

const userController = require("./controllers/user");
const projectController = require("./controllers/project");
const orderController = require("./controllers/order");
const typeController = require("./controllers/type");

const app = express();
app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

const { PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */

mongoose.set('strictQuery', false);
const connectDB = async()=>{
  try{
    const conn = await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    console.log("MongoDB Connected");
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}

/** 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});*/

/***
 * We are applying our middlewear
 */

app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { secure: true, expires: new Date(253402300000000) } }))

app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
    console.log(user);
  }
  next();
})

const authMiddleware = async (req, res, next) => {
    const user = await User.findById(req.session.userID);
    if (!user) {
      return res.redirect('401');
    }
    next()
  }


app.get("/dashboard", orderController.dashboard);



app.get("/", (req, res)=>{
  res.render("login.ejs", { errors: {}, message:{}});
});
app.post("/", userController.login);



app.get("/register", (req, res)=>{
  res.render("register.ejs", { errors: {}, message:{} });
});
app.post("/register", userController.create);



app.get("/password", (req, res)=>{
  res.render("password.ejs", { errors: {}, message:{} });
});
app.post("/password", userController.password);



app.get("/userInfo", userController.listUser);
app.get("/updateUser", userController.edit);
app.post("/updateUser", userController.update);



app.get("/addProject", typeController.list);
app.post("/addProject", projectController.create);
app.get("/viewProject", projectController.list);
app.get("/viewProject/ByType/:id", projectController.viewById);
app.get("/viewProject/remove/:id", projectController.remove);



app.get("/addOrder/:id", projectController.addOrder);
app.post("/addOrder", orderController.create);
app.get("/viewOrder", orderController.list);
app.get("/viewOrder/closed", orderController.closed);
app.get("/viewOrder/open", orderController.open);
app.get("/viewOrder/deliver/:id", orderController.deliver);
app.get("/viewOrder/remove/:id", orderController.remove);



app.get("/addType", (req, res)=>{
  res.render("addType.ejs", { errors: {}, message:{} });
});
app.post("/addType", typeController.create);
app.get("/viewtype", typeController.view);



app.get("/401", (req, res)=>{
  res.render("401.ejs", { errors:{}, message:{} });
});

app.get("/404", (req, res)=>{
  res.render("404.ejs", { errors:{}, message:{} });
});

app.get("/500", (req, res)=>{
  res.render("500.ejs", { errors:{}, message:{} });
});

app.get("/errors", (req, res)=>{
  res.render("errors.ejs", { errors:{}, message:{} });
});


app.get("/logout", async (req, res) => {
    req.session.destroy();
    global.user = false;
    res.redirect('/');
  })



  connectDB().then(() =>{
    app.listen(PORT, () => {
      console.log(
        `Example app listening at ${PORT}`,
        chalk.green("✓")
      );
  })
});
