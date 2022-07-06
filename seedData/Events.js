const mongoose = require('mongoose');
const Events = require('../models/Events')

async function EventDataFillling() {
    const data = [{
            EventName: 'Save the elderly widows',
            description: '',
            goalAmount: 230933,
            raisedAmount: 7895
        },
        {
            EventName: 'Save disaster victims',
            description: '',
            goalAmount: 1876167,
            raisedAmount: 50000
        },
        {
            EventName: 'Treat injured animals',
            description: '',
            goalAmount: 2309300,
            aisedAmount: 1000000
        },
        {
            EventName: 'Treat abondoned cows',
            description: '',
            goalAmount: 12598637
        },
        {
            EventName: 'Give orphaned students opportunities',
            description: '',
            goalAmount: 12162730
        },
        {
            EventName: 'Feed the underprivileged',
            description: '',
            goalAmount: 85796321
        },
        {
            EventName: 'Help intellectually disabled members',
            description: '',
            goalAmount: 8569322
        },
        {
            EventName: 'Help create job opportunities to mentally disabled residents',
            description: '',
            goalAmount: 23093300
        },
        {
            EventName: 'Help HIV infected people',
            description: '',
            goalAmount: 5489632
        }
    ]

    const mongo_uri = process.env.MONGO_URI;
    const dbURL = 'mongodb://localhost:27017/helping-hand'
    mongoose.connect(dbURL)
        .then(() => {
            console.log("Connected to DB")
        })
        .catch(err => console.log(err));


    const enterData = await Events.insertMany(data)
    if (enterData) console.log(enterData);
}

EventDataFillling()