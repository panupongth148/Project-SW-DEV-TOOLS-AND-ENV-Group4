const path = require("path");

const fs = require("fs");

const firebase = require('../db');

const addBookToDatabase = async (data) => {
    console.log("data : ")
    console.log(data)
    try{
        await firebase.firestore().collection("book").add(data)
        return "success"
    }catch(err){
        return "cannot addBook"
    }
}
module.exports = [addBookToDatabase]