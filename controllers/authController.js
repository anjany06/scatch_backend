const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { generateToken } =require("../utils/generateToken");

module.exports.registerUser = async function(req, res){
    try{
      
      //mongodb schemaless database h so ager hm email ya kuch aur provide ni krte hai toh bhi db user create kr dega
      //isko handle krne k liye check ya joy set kr skte hai
  
      // ager hmne yha pe email ya password ya fullname ni kiya destructure aur hmne neeche usko manga h toh hmara error aur server/app crashes
      //toh iss error ko handle kr liye hm try catch lgayenge
      let {email, fullname, password} = req.body;
      let user = await userModel.findOne({
        email: email
      })
      if(user) return res.status(401).send("user already registered")

      if (!email || !fullname || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
          if(err) return res.send(err.message);
          else{
            let user =  await userModel.create({
              email,
              fullname,
              password: hash,
            });
  
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("user created successfully");
          }
  
        })
      })
    } catch(err){
      res.send(err.message);
    }
  
};

module.exports.loginUser = async function(req, res){
  let {email, password } = req.body;

 let user = await userModel.findOne({email,})
 if(!user) return res.send("Email Or password incorrect");

 bcrypt.compare(password, user.password, function(err, result){
  if(result){
    let token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop")
  }else{
    return res.send("Email Or password incorrect");
  }
 })
};

module.exports.logout = function(req, res){
  res.cookie("token","");
  res.redirect("/");
}