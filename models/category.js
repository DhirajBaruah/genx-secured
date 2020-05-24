const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({
   categoryName:String
 
})
mongoose.model('category',categorySchema);

