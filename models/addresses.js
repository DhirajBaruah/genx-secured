const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const addressesSchema = new mongoose.Schema({
   userId:ObjectId,
   nation:String,
   pinCode:Number,
   state:String,
   city:String,
   addresseLine1:String,
   addresseLine2:String

})
mongoose.model('addresses',addressesSchema);