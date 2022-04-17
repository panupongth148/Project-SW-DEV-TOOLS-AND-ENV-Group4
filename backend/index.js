const express = require("express")

const app = express();
const cors = require('cors')
const { logger } = require('./middlewares')
const bp = require('body-parser')
const port=process.env.PORT || 3000;

app.use(cors())
app.use(logger)
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

app.use(indexRouter.router)
app.use(userRouter.router)


module.exports = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
