const express = require('express')
const { isAuthenticated } = require('../middleware/auth')
const router = express.Router({ mergeParams: true })
const Event = require('../models/Events')
const User = require('../models/User')

router
    .post('/event', isAuthenticated, async(req, res, next) => {
        const newEvent = new Event(req.body)
        newEvent.save()
            .then(res => console.log("Event added successfully"))
            .catch(err => console.log(err))
    })
    .get('/event/contribute/:id', isAuthenticated, async(req, res, next) => {
        const { id } = req.params
        const event = await Event.findOne({ _id: id })
        res.render('eventContribute', { event, email: req.cookies.email, contact: req.cookies.contact, username: req.cookies.username })
    })
    .post('/event/contribute/:id', isAuthenticated, async(req, res) => {
        const { id } = req.params
        const { email, raisedAmount } = req.body
        const user = await User.findOne({ email })
        const event = await Event.findOne({ _id: id })
        if (!event.user.includes(user._id))
            event.user.push(user._id)
        const updatedData = {
            raisedAmount: parseInt(raisedAmount) + event.raisedAmount,
            user: event.user
        }
        const updatedEvent = await Event.findOneAndUpdate({ _id: id }, updatedData, { new: true })
            // console.log(updatedEvent);
        if (updatedEvent) {
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
        // res.send(req.body)
    })
module.exports = router