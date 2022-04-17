const express = require("express");
const path = require("path");

const fs = require("fs");

const firebase = require('../db');
const addBookToDatabase = require("../repository/bookRepository")


router = express.Router();



/*-----------------------  ADD BOOK API   ------------------------------------------*/

const addBook =  async function (req, res, next) {
  // router.post("/addBook/:storeId", async function (req, res, next) {
    // console.log(req)
    console.log(req.body.book_name)
    if (req.method == "POST") {
      const file = req.files;
      console.log(file)
      let pathArray = [];

      if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
      }
      
      const book_name = req.body.book_name;
      const book_type = req.body.book_type;
      const book_count = req.body.book_count;
      const book_price = req.body.book_price;
      const book_category = req.body.book_category;
      const book_discount = req.body.book_discount;
      const book_description = req.body.book_description;

      console.log(book_description)

      let image;
      req.files.forEach((file, index) => {
          image = file.path.substring(6);
          // image = {
          //   0: file.path.substring(6)
          // }
          // pathArray.push(path);
        });
        console.log(image)
      let bookobj = {
        book_name: book_name,
        book_type: book_type,
        book_description: book_description,
        book_count: book_count,
        book_price: book_price,
        book_category: book_category,
        book_discount: book_discount,
        book_reccommend: 0,
        store_id: req.params.storeId,
        image: image
      }
      // console.log(bookobj)
      try{
      const resMessage = addBookToDatabase(bookobj)
      return res.json({ message: resMessage })
      console.log(bookobj)
      await firebase.firestore()
      .collection("book")
      .add(bookobj)
      return res.json({ message: "success" })
    }catch(err){
        console.log(err);
        return res.status(400).json({ message: err });
      };
    }
  }

// Book detail
// async function getBookDetail(req, res) {
//   console.log(req.params.bookId);
//   console.log("in book detail api")
//   let bookinfo;
//   try {
//    const snapshot = await firebase.firestore().collection('book').where(firebase.firestore.FieldPath.documentId(), '==' , req.params.bookId ).get();
//     // console.log(snapshot);
//     if (snapshot.empty) {
//       console.log('No matching documents.');
//       return;
//     }  
//     let idDoc;
//     snapshot.forEach(doc => {
//       idDoc = doc.id
//       bookinfo = doc.data()
//     });
//     bookinfo.id = idDoc
//     return res.send(bookinfo);    
//   } catch(err) {
//     console.log(err)
//     return res.status(500).json(err);
//   };
// }

module.exports = [addBook]
