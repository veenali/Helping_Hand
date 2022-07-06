const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ngoSchema = new Schema({
    NGOName: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    requirements: {
        type: Array
    }
}, { timestamps: true })

const NGO = mongoose.model('NGO', ngoSchema);

module.exports = NGO;