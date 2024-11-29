const mongoose = require('mongoose');
// How to use debugger
const dbgr = require("debug")("development:mongoose");

//so debugger se hm enviroment variable setup kr skte hai taaki
// hme connected dikhe but jb hm codebases share kre and woh kisi aur k console me na dikhe
const config = require("config");

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
  dbgr("connected")
})
.catch(function(err){
  dbgr(err);
})

//this will give the whole control of databaase scatch
module.exports = mongoose.connection;
