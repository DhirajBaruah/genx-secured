const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const productSchema = new mongoose.Schema({
   productName:String,
   price:Number,
   specification:String,
   weight:Number,
   length:Number,
   productCategoryId:ObjectId
})
mongoose.model('product',productSchema);