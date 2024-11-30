const jwt = require("jsonwebtoken");
const userModel = require('../models/user-model');
const { modelNames } = require("mongoose");

module.exports = async function(req, res, next){
  if(!req.cookies.token){
    req.flash("error", "you need to login first");
    // flash messege mtlb hmne yeh msg create kiya h issh route hai and isko hm iske data ko dusre route me bhi access kr skte hhai
    return res.redirect("/")
  }
try{
  let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = await userModel
  .findOne({email : decoded.email})
  // ishe hm yeh keh rhe ki hme user k data me se password ni chaiye
  .select("-password");

  req.user = user;
  next();
} 
catch(err){
  req.flash("error", "something went wrong");
  res.redirect("/")
}
}