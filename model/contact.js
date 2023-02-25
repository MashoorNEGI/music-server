    
var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var contact = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Subject: {
            type: String,   
        },
        Message: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("Contact",contact)