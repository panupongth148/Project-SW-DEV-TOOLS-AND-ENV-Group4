const express = require("express");
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { isLoggedIn } = require('../middlewares')
const fs = require("fs");
const path = require("path");
const firebase = require('../db');

const [registerAccount, loginAccount] = require("../controller/userController")
router = express.Router();

const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
      console.log(file);
    if(file !== ''){
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
          );
    }
  },
});

router.get('/user/me', isLoggedIn, async (req, res, next) => {
    res.json(req.user)
})

router.post('/account/register', async (req, res, next) => {
       return registerAccount(req, res, next)
})


// Login


router.post('/account/login', async (req, res, next) => {

    try {
       return loginAccount(req, res, next)
    } catch (error) {
        res.status(400).json(error.toString())
    }
})






exports.router = router
