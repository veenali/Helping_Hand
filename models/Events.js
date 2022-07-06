const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    EventName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    goalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    raisedAmount: {
        type: Number,
        default: 0
    },
    user: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
}, { timestamps: true })

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;