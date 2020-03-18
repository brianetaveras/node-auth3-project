const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../modules/users-module");
const verifyUser = require('../middleware/verifyUser')

router.post("/register", async (req, res, next) => {
  try {
    const {username, password, department} = req.body;
    if (!username || !password || !department) {
      return res.status(400).json({
        message: "All fields are required! "
      });
    }


    const newUser = await db.addUser(req.body)

    res.json(newUser);
    
  } catch (err) {
    switch (err.errno) {
      case 19:
        return res.json({
          message: "Your username is already in use. Choose another one!"
        });
      default:
        next(err);
    }
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await db.findUser(username);
    const passwordMatches = await bcrypt.compare(password, user.password)

    if(user && passwordMatches){
        const token = await jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRET)

        return res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 8 * 3600000)
        }).redirect(301, '/api/users')
    }

    res.status(401).json({message: 'You shall not pass!'})

  } catch (err) {
    next(err);
  }
});

router.get('/users', verifyUser(), async (req, res, next)=>{

    try{
        const users = await db.findAllUsers()
        res.json(users)
    } catch(err) {
        next(err)
    }


})

module.exports = router;
