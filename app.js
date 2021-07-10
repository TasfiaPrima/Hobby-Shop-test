require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/user.auth.route");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

//Connect to Database:
mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log("Error");
  });

// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use(authRoutes);

module.exports = app;
