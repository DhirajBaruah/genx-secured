const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userAuthCredentialsSchema = new mongoose.Schema({
   usersId:Object,
   password:String
})
mongoose.model('userAuthCredentials',userAuthCredentialsSchema);