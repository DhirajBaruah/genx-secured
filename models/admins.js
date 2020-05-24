const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminsSchema = new mongoose.Schema({
  usernameForAdmin:String,
  password:String
})

adminsSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};
mongoose.model('admins',adminsSchema);