const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const cartsSchema = new mongoose.Schema({
   userId:ObjectId,
   addressId:ObjectId,
   productId:ObjectId,
   quantity:Number,
   payableAmount:Number,
})
mongoose.model('carts',cartsSchema);