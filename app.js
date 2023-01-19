
require("dotenv").config();
const express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cookieParser = require('cookie-parser');
  expressSession = require("express-session");
  chalk = require("chalk"),
  bodyParser = require("body-parser"),
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

mongoose.set('strictQuery',false);
const connectDB = async()=>{
  try{
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}

/***
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});


 * We are applying our middlewear
 */

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(expressSession({ 
  secret: 'for barr', 
  cookie: 
  { 
    expires: new Date(253402300000000) 
  } 
}));

global.user = false;
app.use("*", async (req, res, next) => {
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next();
}


app.get("/dashboard", authMiddleware, orderController.dashboard);

app.get("/", (req, res) => {
  res.render("login.ejs", { errors: {}, message: {} });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { errors: {}, message: {} });
});
app.post("/login", userController.login);



app.get("/register", (req, res) => {
  res.render("register.ejs", { errors: {}, message: {} });
});
app.post("/register", userController.create);



app.get("/password", (req, res) => {
  res.render("password.ejs", { errors: {}, message: {} });
});
app.post("/password", userController.password);



app.get("/userInfo", authMiddleware, userController.listUser);
app.get("/updateUser", authMiddleware, userController.edit);
app.post("/updateUser", authMiddleware, userController.update);



app.get("/addProject", authMiddleware, typeController.list);
app.post("/addProject", authMiddleware, projectController.create);
app.get("/viewProject", authMiddleware, projectController.list);
app.get("/viewProject/ByType/:id", authMiddleware, projectController.viewById);
app.get("/viewProject/remove/:id", authMiddleware, projectController.remove);



app.get("/addOrder/:id", authMiddleware, projectController.addOrder);
app.post("/addOrder", authMiddleware, orderController.create);
app.get("/viewOrder", authMiddleware, orderController.list);
app.get("/viewOrder/closed", authMiddleware, orderController.closed);
app.get("/viewOrder/open", authMiddleware, orderController.open);
app.get("/viewOrder/deliver/:id", authMiddleware, orderController.deliver);
app.get("/viewOrder/remove/:id", authMiddleware, orderController.remove);



app.get("/addType", authMiddleware, (req, res) => {
  res.render("addType.ejs", { errors: {}, message: {} });
});
app.post("/addType", authMiddleware, typeController.create);
app.get("/viewtype", authMiddleware, typeController.view);



app.get("/401", (req, res) => {
  res.render("401.ejs", { errors: {}, message: {} });
});

app.get("/404", (req, res) => {
  res.render("404.ejs", { errors: {}, message: {} });
});

app.get("/500", (req, res) => {
  res.render("500.ejs", { errors: {}, message: {} });
});

app.get("/errors", (req, res) => {
  res.render("errors.ejs", { errors: {}, message: {} });
});


app.get("/logout", authMiddleware, async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/login');
})

connectDB().then(()=>{
  app.listen(PORT, ()=>{
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓"))
  })
})


/** 
app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});*/
