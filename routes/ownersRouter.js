const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");


// if(process.env.NODE_ENV === "development"){
// toh ise hm yeh keh rhe ki ek main owner ho aur woh hmne bna diya hai iske koi aur owner na ho
router.post("/create", async function(req, res){
  let owners = await ownerModel.find();
  if(owners.length > 0) {return res.status(503).send("You don't have permission to create owner")}

  let {fullname, email, password} =req.body;

  let createdOwner = await ownerModel.create({
  fullname,
  email,
  password,  
})
res.status(201).send(createdOwner)
});

router.get("/", function(req, res){
  res.send("Hello World");
});

// so yeh route sirf hme development face me chalana hai yeh hm aese krenge



module.exports = router;