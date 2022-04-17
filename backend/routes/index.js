const express = require("express");
// const pool = require("../config");
// const querystring = require('querystring');

const searchBook = require("../controller/indexController")
router = express.Router();

router.get("/", searchBook);



exports.router = router;
