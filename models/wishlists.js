const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const wishlistsSchema = new mongoose.Schema({
   userId:ObjectId,
   productId:ObjectId
})
mongoose.model('wishlists',wishlistsSchema);