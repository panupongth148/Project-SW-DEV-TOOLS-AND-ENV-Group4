

var admin = require("firebase-admin");

var serviceAccount = require("./book2hand-29049-firebase-adminsdk-y8uxf-7598c533b1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;