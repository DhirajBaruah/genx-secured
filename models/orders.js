const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const ordersSchema = new mongoose.Schema({
   userId:ObjectId,
   productId:ObjectId,
   addressId:ObjectId,
   quantity:Number,
   payableAmount:Number,
   modeOfPayment:String,
   status:String
}, {
    timestamps: true
})
mongoose.model('orders',ordersSchema);