const express = require("express");
const path = require("path");
const fs = require("fs");

const firebase = require("../db");
const [getBooksFromStore, getStoreData, deleteBook, updateBook] = require("../controller/storeController")
router = express.Router();

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

router.get("/store/managebook/:id", async function (req, res, next) {
  return getBooksFromStore(req, res, next)
  }
);

router.get("/store/:id", async function (req, res, next) {
  try {
    return getStoreData(req, res, next);
  } catch (err) {
    console.log("error");
    return res.status(404).json(err);
  }
});

router.put(
  "/store/editbook/:id",
  upload.array("myImage", 5),
  async (req, res, next) => {
    try{
    return updateBook(req, res, next);
    } catch (err) {
      console.log(err)
      return res.status(404).json(err)
      next(err);
    } finally {
      console.log("finally");
      
    }
  }
);

router.delete(
  "/store/managebook/deletebook/:id",
  async function (req, res, next) {
    console.log(req.params.id);
    try {
      return deleteBook(req, res, next)
    } catch (error) {
      console.log("error");
      return res.status(202).json(error);
    }
  }
);
exports.router = router;
