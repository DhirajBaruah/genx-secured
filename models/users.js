const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new mongoose.Schema({
  googleId:String,
  usernameForAdmin:String,
  password:String
})
usersSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

mongoose.model('users',usersSchema);