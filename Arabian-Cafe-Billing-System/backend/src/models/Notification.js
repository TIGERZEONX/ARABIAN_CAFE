const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  name:{type:String,required:true},
  isActive:{type:Boolean,default:true}
},{timestamps:true});

module.exports = mongoose.model("Notification", notificationSchema);
