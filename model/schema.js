const dotenv = require("dotenv")
// const jwt = require("jsonwebtoken")
dotenv.config({ path: "../config.env" })
var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
var register = new Schema(
  {
    Name: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true
    },
    Phone: {
      type: Number,
      required: true
    },
    Password: {
      type: String,
      required: true
    }
  }
)



// hassing the password

register.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(this.Password, salt)
    this.Password = hashed
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model('Register', register);

module.exports = User
