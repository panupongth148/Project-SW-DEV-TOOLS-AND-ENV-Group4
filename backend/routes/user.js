const express = require("express");
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { isLoggedIn } = require('../middlewares')
const fs = require("fs");
const path = require("path");
const firebase = require('../db');


router = express.Router();

const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
      console.log(file);
    if(file !== ''){
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
          );
    }
  },
});
const upload = multer({ storage: storage});

// Register
const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Too short password.')
    } else if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('ez password.')
    } return value
}
const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT username FROM account WHERE username = ?", [value]);

    if (rows.length > 0) {
        const message = 'A username is already taken. Please input new username.';
        throw new Joi.ValidationError(message, { message });
    } return value;
}

const signupSchema = Joi.object ({
    email: Joi.string().required().email(),
    phone_number: Joi.string().required().pattern(/0[0-9]{9}/),
    first_name: Joi.string().required().max(150),
    last_name: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    username: Joi.string().required().min(5).external(usernameValidator),
    acc_type: Joi.string().required()
})

const chagePasswordSchema = Joi.object ({
    oldPassword: Joi.string().required().custom(passwordValidator),
    newPassword: Joi.string().required().custom(passwordValidator),
    confirmNewPassword: Joi.string().required().valid(Joi.ref('newPassword')),
   
})

const editProfileSchema = Joi.object ({
    email: Joi.string().required().email(),
    phone_number: Joi.string().required().pattern(/0[0-9]{9}/),
    first_name: Joi.string().required().max(150),
    last_name: Joi.string().required().max(150),
    username: Joi.string().required().min(5),
    address: Joi.required(),
    address_no: Joi.required()
})

router.get('/user/me', isLoggedIn, async (req, res, next) => {
    res.json(req.user)
})

router.post('/account/register', upload.array("myImage", 5), async (req, res, next) => {
    if (req.method == "POST") {
        const file = req.files;
        let path;
        // try {
        //     await signupSchema.validateAsync(req.body, { abortEarly: false })
        // } catch (err) {
        //     return res.status(400).json(err)
        // }
        
        // const conn = await pool.getConnection()
        // await conn.beginTransaction()

        const username = req.body.username
        const password = await bcrypt.hash(req.body.password, 5)
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const phone_number = req.body.phone_number
        const acc_type = req.body.acc_type
        console.log(file.length)
        let docresid;
        if(file.length == 0){
            delete req.body.myImage;
        }
        // https://th.jobsdb.com/en-th/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png
        try {
            if (file.length === 0) {
                let user = {
                    username: username,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone_number: phone_number,
                    type: acc_type,
                    image: null,
                    token: null,
                    address: null
                }
                console.log(user)
                await firebase.firestore()
      .collection("account")
      .add(user).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        docresid = docRef.id;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
                
            } else {
                console.log(file.path)
                path = file[0].path.substring(6)
                let user = {
                    username: username,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone_number: phone_number,
                    type: acc_type,
                    image: path,
                    token: null,
                    address: null
                }
                console.log(user)
                await firebase.firestore()
      .collection("account")
      .add(user)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        docresid = docRef.id;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
            }
            if (acc_type == "seller"){
                const storeSnapshot = await firebase.firestore().collection("store").get()
            let maxStoreId = 0;
            await storeSnapshot.forEach((res) => {
                if(parseInt(res.data().store_id) > maxStoreId){
                    maxStoreId = parseInt(res.data().store_id)
                }
            })
            await firebase.firestore().collection("store").add({
                store_id: maxStoreId+1,
                account_id: docresid,
                store_name: username + "\'s Store",
                comment: null,
                reviews: null
            })
            }
            res.status(201).send()
        } catch (err) {
            // conn.rollback()
            res.status(400).json(err.toString());
        } finally {
            // conn.release()
        }
    }
})


// Login
function generateToken () {
    const result = [];
    const characters = '*/=-$#!@^&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 100; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
   }
   return result.join('');
}

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

router.post('/account/login', async (req, res, next) => {
    console.log(req.body.username)
    // try {
    //     await loginSchema.validateAsync(req.body, { abortEarly: false })
    // } catch (err) {
    //     return res.status(400).send(err)
    // }
    const username = req.body.username
    const password = req.body.password
    console.log(username, password)


    try {
        // const [users] = await conn.query('SELECT * FROM account WHERE username = ?', [username])

        const snapshot = await firebase
      .firestore()
      .collection("account")
      .where("username", "==", username)
      .get();
      let resDatabase_username;
      let resDatabase_password;
      let docId;
      await snapshot.forEach((res) => {
        // idcollection = res.id;
        docId = res.id
        resDatabase_username = res.data().username
        resDatabase_password = res.data().password

       
      });
        // Check username
    

        if (!resDatabase_username) {
            throw new Error('Incorrect username or password')
        }

        // Check password
        if (!(await bcrypt.compare(password, resDatabase_password))) {
            throw new Error('Incorrect username or password')
        }

        // Check token already
        const snapshotToken = await firebase
        .firestore()
        .collection("account")
        .where("username", "==", username)
        .get();
        let resDatabase_token;
        await snapshotToken.forEach((res) => {
          // idcollection = res.id;
          resDatabase_token = res.data().token
  
         
        });

        let token;
        console.log(resDatabase_token);
        if (!resDatabase_token) {
            // Generate and save token into database
            token = generateToken()
            await firebase.firestore().collection('account').doc(docId).update({
                  token: token
              });
            // await conn.query('INSERT INTO tokens(account_id, token) VALUES (?, ?)', [user.account_id, token])
        }
        else {
            token = resDatabase_token;
        }

        res.status(200).json({ 'token': token })
    } catch (error) {
        res.status(400).json(error.toString())
    }
})






exports.router = router
