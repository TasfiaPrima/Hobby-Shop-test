const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstname: { type: string, required: true },
  lastname: { type: string, required: true },
  email: { type: string, required: true, unique: true },
  password: { type: string, required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
