const express = require("express")

const functions = require('firebase-functions');
const builderFunction = functions.region('asia-east2').https;
const app = express();
const cors = require('cors')
const { logger } = require('./middlewares')
const bp = require('body-parser')
const config = require('./config')

app.use(cors())
app.use(logger)
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers

const bookRouter = require('./routes/book')


const storeRouter = require('./routes/store')




app.use(bookRouter.router)


app.use(storeRouter.router)


app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})


// exports.hello = builderFunction.onRequest(sample.hello);