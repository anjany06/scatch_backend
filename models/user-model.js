const mongoose = require("mongoose");



const userSchema = mongoose.Schema({
  fullname : String,
  email : {
    type : String,
    minLength : 3,
    trim : true
  },
  password : String,
  cart : {
    type : Array,
    default : []
  },
  isadmin: Boolean,
  orders : {
    type : Array,
    default : []
  },
  contact : Number,
  picture : String,
})

module.exports = mongoose.model("user", userSchema);