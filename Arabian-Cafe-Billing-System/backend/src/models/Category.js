const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name:{type:String,required:true},
  slug:{type:String,required:true,unique:true},
  parentCategory:{type:mongoose.Schema.Types.ObjectId,ref:"Category",default:null},
  level:{type:Number,default:0},
  description:{type:String,default:""},
  image:{type:String,default:""},
  isActive:{type:Boolean,default:true}
},{timestamps:true});

module.exports = mongoose.model("Category", categorySchema);
