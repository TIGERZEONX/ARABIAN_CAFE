const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  name:{type:String,required:true},
  isActive:{type:Boolean,default:true}
},{timestamps:true});

module.exports = mongoose.model("Purchase", purchaseSchema);
