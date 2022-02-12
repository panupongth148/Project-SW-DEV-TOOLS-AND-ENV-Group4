const express = require("express");
const path = require("path");

const fs = require("fs");


const firebase = require("../db");

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


router.get("/store/managebook/:storeid", async function (req, res, next) {
  // const conn = await pool.getConnection();
  // await conn.beginTransaction();
  // console.log(req.params.id)
  let bookInStore = [];
  // let idcollection;
  try {
    const snapshot = await firebase
      .firestore()
      .collection("book")
      .where("store_id", "==", req.params.storeid)
      .get();
    await snapshot.forEach((res) => {
      // idcollection = res.id;
      let bookonce = res.data();
      bookonce.id = res.id;
      bookInStore.push(bookonce);
    });
    // bookInStore.book_id = idcollection
    res.json({
      book: bookInStore,
      error: null,
    });
  } catch (err) {
    console.log("error");
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    // conn.release();
  }
});



exports.router = router;
