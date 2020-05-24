const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const equipmentsSchema = new mongoose.Schema({
   equipmentName:String,
   specification:String,
   price:Number
})
mongoose.model('equipments',equipmentsSchema);