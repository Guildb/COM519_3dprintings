
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/User");

/**
 * Controllers (route handlers).
 */



const app = express();
app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

const { PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/***
 * We are applying our middlewear
 */

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))

app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
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

app.get("/",(req, res)=>{
    res.render("index", { errors: {}, message:{} });
});

app.get("/login", (req, res)=>{
  res.render("login.ejs", { errors: {}, message:{}});
});

app.get("/register", (req, res)=>{
  res.render("register.ejs", { errors: {}, message:{} });
});

app.get("/forgot", (req, res)=>{
  res.render("password.ejs", { errors: {}, message:{} });
});

app.get("/charts", (req, res)=>{
  res.render("charts.ejs", { errors: {}, message:{} });
});

app.get("/tables", (req, res)=>{
  res.render("tables.ejs", { errors: {}, message:{} });
});

app.get("/401", (req, res)=>{
  res.render("401.ejs", { message:{} });
});

app.get("/404", (req, res)=>{
  res.render("404.ejs", { message:{} });
});

app.get("/500", (req, res)=>{
  res.render("500.ejs", { message:{} });
});




app.get("/logout", async (req, res) => {
    req.session.destroy();
    global.user = false;
    res.redirect('/');
  })



app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});
