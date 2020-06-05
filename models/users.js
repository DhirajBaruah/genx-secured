const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new mongoose.Schema({
  googleId: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  fname:String,
  lname:String,
  createdOn: Date,
});
usersSchema.methods.validPassword = function (pwd) {
  return this.password === pwd;
};

mongoose.model("users", usersSchema);
