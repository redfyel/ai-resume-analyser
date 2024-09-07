let exp = require("express");
const {Db} = require('mongodb')
const userApp = exp.Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenVerify = require('../middlewares/tokenVerify.js')
const expressAsyncHandler = require('express-async-handler')

require('dotenv').config()

//add body parser middleware
userApp.use(exp.json());


userApp.get('/user/:name', expressAsyncHandler(async (req, res) => {
  const { name } = req.params;
  const usersCollection = req.app.get('usersCollection');
  
  try {
    const user = await usersCollection.findOne({ name });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
}));



//route for creating a user (public)
userApp.post("/user", expressAsyncHandler(async(req, res) => {

  const usersCollection = req.app.get('usersCollection')
  const newUser = req.body;

  //verify duplicate user
  let existingUser  = await usersCollection.findOne({username:newUser.name});

  //if user already existed
  if(existingUser !==null) {
    res.send({message : "User already existed"})
  } else {
    //hash the password
    let hashedpassword = await bcryptjs.hash(newUser.password, 7)

    //replace plain password with hashed password in newUser
    newUser.password = hashedpassword;
    //save user
    await usersCollection.insertOne(newUser)
    //send res
    res.send({message : "user created"})
  }
}));

//route for update user (protected)
userApp.put("/user", tokenVerify,expressAsyncHandler(async(req, res) => {
  //get usersCOllection Obj
  const usersCollection = req.app.get("usersCollection")
  //get modified user from client
  let modifiedUser = req.body;
  //modify by username
  await usersCollection.updateOne({username:modifiedUser.username}, {$set : {...modifiedUser}})
  res.send({message : "user's modified"})
}));

userApp.post("/login", expressAsyncHandler(async (req, res) => {
  // Get usersCollection obj
  const usersCollection = req.app.get('usersCollection');

  // Get user credentials from client
  const userCred = req.body;

  // Verify username
  let dbUser = await usersCollection.findOne({ name: userCred.username });

  // If user does not exist
  if (dbUser === null) {
    res.status(400).send({ message: "Invalid Username" });
  } else {
    // Compare passwords
    let result = await bcryptjs.compare(userCred.password, dbUser.password);

    // If passwords do not match
    if (result === false) {
      res.status(400).send({ message: "Invalid Password" });
    } else {
      // Send response with user data
      res.status(200).send({ message: "Login success", user: dbUser });
    }
  }
}));



module.exports = userApp;