const express = require("express");
const path = require("path");

const fs = require("fs");

const firebase = require('../db');
const [addBook, getBookDetail] = require("../controller/bookController")


router = express.Router();

// Require multer for file upload
const multer = require("multer");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });


/*-----------------------  ADD BOOK API   ------------------------------------------*/
// router.post("/signin", authController.authLogin);
router.post("/addBook/:storeId", upload.array("myImage", 5), async function (req, res, next) {
  
      try{
      addBook(req, res, next)
    }catch(err){
        console.log(err);
        return res.status(400).json({ message: err });
      };
    
  }
);


// Book detail
router.get("/book/detail/:bookId", async function (req, res) {
  
  try {
   return getBookDetail(req, res)
  } catch(err) {
    console.log(err)
    return res.status(500).json(err);
  };
});

exports.router = router;
