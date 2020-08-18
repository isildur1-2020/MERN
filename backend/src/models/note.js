const { Schema, model } = require('mongoose')

const note = new Schema({
    title: String,
    content: {
        type: String,
        required: true
    },
    author: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})
module.exports = model('note', note, 'notes')