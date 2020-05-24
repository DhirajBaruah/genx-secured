const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const productCategorySchema = new mongoose.Schema({
   productCategoryName:String,
   categoryId:ObjectId,
   details:String,
 
   
})
mongoose.model('productCategory',productCategorySchema);