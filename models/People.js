const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Firstname: {
        require: true,
        type: String
    },
    Lastname:  {
        require: true,
        type: String
    },
    Email: {
        require: true,
        type: String,
        unique: true
    },
    Password: String
})

module.exports = mongoose.model('People', userSchema)