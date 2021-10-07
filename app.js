require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");

//Connect to Database:
mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log("Error");
    process.exit(1);
  });

// for parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/users',require('./routes/user.route'))

module.exports = app;
