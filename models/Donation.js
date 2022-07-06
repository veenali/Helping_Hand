const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    NGOName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pickupAddress: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    additionalDetails: {
        type: String
    },
    user: {
        type: []
    }
}, {
    timestamps: true
})

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;