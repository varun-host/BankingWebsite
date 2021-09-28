var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./db/models");
let { customer } = require("./models/customer");
const hbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

var customerRouter = require("./routes/customers/index.js");
var transferRouter = require("./routes/transfer/index.js");
var transactionRouter = require("./routes/transactions/transactions.js");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.authenticate()
  .then(() => console.log("Databse connected.."))
  .catch((err) => console.log("Error: " + err));

// view engine setup ======================================
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  hbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("homepage"));
app.use("/customer", customerRouter);
app.use("/transfer", transferRouter);
app.use("/transactions", transactionRouter);
// app.use('/users', usersRouter);

module.exports = app;
