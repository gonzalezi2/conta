const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const User = require('../models/user');

router.post('/register', (req, res, next) => {
  let newUser = new User(req.body);
  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, message: `Failed to register new user. Error: ${err}`});
    } else {
      res.json({success: true, message: `Successfully registered new user. User: ${user}`});
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if(!user) {
      return res.json({success: false, message: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data:user}, process.env.SECRET, {
          expiresIn: 604800 // 1week
        });

        res.json({success: true, token: 'JWT '+token, user: {id: user._id, name: user.name, email: user.email}});
      } else {
        res.json({success: false, message: 'Password is incorrect'});
      }
    });

  });
});

module.exports = router;
