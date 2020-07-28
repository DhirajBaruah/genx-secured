const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const { MONGO_URI } = require("./util/secrets");
const { COOKIE_KEY } = require("./util/secrets");
require("./models/equipments");
require("./models/admins");
require("./models/category");
require("./models/product");
require("./models/productCategory");
require("./models/users");
require("./models/userAuthCredentials");
require("./models/carts");
require("./models/wishlists");
require("./models/addresses");
require("./models/orders");
require("./services/passport");
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
  () => {
    console.log("connected to db");
  }
);
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//     cookieSession({
//         maxAge:30 * 24 * 60 * 60 *1000,
//         keys:[COOKIE_KEY]
//     })
// )
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// //PROXY
// app.use('/*', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use('*', express.static(path.join(__dirname, "client", "build")))
  // const path = require("path");
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
}

// import admin routes
const adminRoutes = require("./controllers/admin");
// import app routes
const appRoutes = require("./controllers/app");
// admin routes
app.use("/admin", adminRoutes);
// app routes
app.use("/app", appRoutes);


module.exports = app;
