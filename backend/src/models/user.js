const { Schema, model } = require('mongoose')

const user = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
})
module.exports = model('user', user, 'users')