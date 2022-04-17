const express = require("express");


const searchBook = require("../controller/indexController")
router = express.Router();

router.get("/", searchBook);

exports.router = router;
