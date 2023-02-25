const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config({ path: "./config.env" })
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, function () {
  console.log("connected")
})