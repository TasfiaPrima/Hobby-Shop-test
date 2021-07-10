require("dotenv").config();
const express = require("express");
const app = express();
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

module.exports = app;
