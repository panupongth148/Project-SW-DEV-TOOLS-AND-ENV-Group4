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

async function getBooksFromStore (req, res, next) {
  // const conn = await pool.getConnection();
  // await conn.beginTransaction();
  // console.log(req.params.id)
  let bookInStore = [];
  // let idcollection;
  try {
    const snapshot = await firebase
      .firestore()
      .collection("book")
      .where("store_id", "==", req.params.id)
      .get();
    await snapshot.forEach((res) => {
      // idcollection = res.id;
      let bookonce = res.data();
      bookonce.id = res.id;
      bookInStore.push(bookonce);
    });
    // bookInStore.book_id = idcollection
    
    return res.json({
      book: bookInStore,
      error: null,
    });
  } catch (err) {
    console.log("error");
    return res.status(500).json(err);
  }
};
/* delete book api */

  async function deleteBook (req, res, next) {
    console.log(req.params.id);
    try {
      let id = req.params.id
      console.log(id)
      await firebase
          .firestore()
          .collection("book")
          .doc(id).delete();
      
      return res.status(200).json("success");
    } catch (error) {
      console.log("error");
      return res.status(202).json(error);
    }
  }
;

async function getStoreData (req, res, next) {
  let storeData;
  try {
    const snapshot = await firebase
      .firestore()
      .collection("store")
      .where("account_id", "==", req.params.id)
      .get();
    await snapshot.forEach((res) => {
      // idcollection = res.id;
      storeData = res.data();
    });
    // bookInStore.book_id = idcollection
    
    return res.status(200).json({
      storeData: storeData,
      error: null,
    });
  } catch (err) {
    console.log("error");
    return res.status(404).json(err);
  }
};

const updateBook = 
  async (req, res, next) => {
    const file = req.files;
    let pathArray = [];
    // console.log(req.body)
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      next(error);
    }
    console.log("book_name")
    const book_name = req.body.book_name;
    const book_type = req.body.book_type;
    const book_count = req.body.book_count;
    const book_price = req.body.book_price;
    const book_category = req.body.book_category;
    const book_discount = req.body.book_discount;
    const book_description = req.body.book_description;
    const store_id = req.body.store_id
    // const imageBook = req.body.imageBook;
    // let discountPrice = req.body.bookDiscount;
    // console.log(discountPrice);


    // const conn = await pool.getConnection();
    // await conn.beginTransaction();

    try {
      // console.log(content)
    
      if (file.length > 0) {
        let image;
        req.files.forEach((file, index) => {
          // let path = {index: file.path.substring(6)};
          image = file.path.substring(6);
          // image = {
          //   0: file.path.substring(6)
          // }
          // pathArray.push(path);
        });
        let bookobj = {
          book_name: book_name,
          book_type: book_type,
          book_description: book_description,
          book_count: book_count,
          book_price: book_price,
          book_category: book_category,
          book_discount: book_discount,
          book_reccommend: 0,
          store_id: store_id,
          image: image
        }
        let id = req.params.id;
        // console.log(id)
        // console.log("ID Params : ")
        // console.log(req.params.id)
        // console.log(bookobj)
        await firebase
          .firestore()
          .collection("book")
          .doc(id)
          .update(bookobj);
      }else{
        let bookobj = {
          book_name: book_name,
          book_type: book_type,
          book_description: book_description,
          book_count: book_count,
          book_price: book_price,
          book_category: book_category,
          book_discount: book_discount,
          book_reccommend: 0,
          
        }
        let id = req.params.id;
        // console.log(id)
        // console.log("ID Params : ")
        // console.log(req.params.id)
        // console.log(bookobj)
        await firebase
          .firestore()
          .collection("book")
          .doc(id)
          .update(bookobj);
      
      }

      console.log("success")
      return res.status(200).json("success!");
    } catch (err) {
      console.log(err)
      return res.status(404).json(err)
    //   next(err);
    } finally {
      console.log("finally");
      
    }
  }
;

module.exports = [getBooksFromStore, getStoreData, deleteBook, updateBook];
