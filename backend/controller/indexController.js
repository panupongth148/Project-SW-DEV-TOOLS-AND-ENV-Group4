const express = require("express");

const firebase = require("../db");


const searchBook = async (req, res, next)  => {
  let result = []
  console.log(req.params)
  console.log(req.query)
  console.log(req.query.type)
  console.log(req.query.search)
  try {
  if (req.query.search === 'type') {
    const snapShotGetType = await firebase.firestore().collection("book").where("book_type", "==", req.query.type).get()
    await snapShotGetType.forEach(res => {
      result.push(res.data())
    });

  }
  else if (req.query.search === 'discount') {

    const snapShotGetDiscount = await firebase.firestore().collection("book").where("book_discount", "!=", "0").get()
    await snapShotGetDiscount.forEach(res => {
      result.push(res.data())
    });
  }
  else {
    console.log("in search")
    const search = req.query.search || '';

    const snapShotgetReccommend = await firebase.firestore().collection("book").where("book_recommend", "==", "1").get()
    await snapShotgetReccommend.forEach(res => {
      result.push(res.data())
    });
    console.log(search)
    if (search.length > 0) {
      // sql = 'SELECT a.*, b.image_source FROM book AS a LEFT JOIN (SELECT * FROM images) AS b ON a.book_id = b.book_id WHERE (a.book_name LIKE ? OR a.book_description LIKE ?) and b.main = 1;'
      // cond = [`%${search}%`, `%${search}%`]
      // console.log(sql);
      const snapShotGetSearchedBook = await firebase.firestore().collection("book").orderBy("book_name").startAt(search).endAt(search+'\uf8ff').get();
      await snapShotGetSearchedBook.forEach(res => {
        result.push(res.data())
      });
    }
  }
    console.log("result : ")
    console.log(result)
    // const [rows, fields] = await pool.query(sql, cond);
    // console.log(rows);
    
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err)
  }
};

module.exports = searchBook;
