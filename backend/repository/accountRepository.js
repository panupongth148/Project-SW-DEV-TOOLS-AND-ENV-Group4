const path = require("path");

const fs = require("fs");

const firebase = require('../db');

const registerToDatabase = async (data) => {
    await firebase.firestore()
      .collection("account")
      .add(user)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        docresid = docRef.id;
    })
}
module.exports = [registerToDatabase]