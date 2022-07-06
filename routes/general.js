const express = require('express')
const router = express.Router({ mergeParams: true })

const Event = require('../models/Events')
const NGO = require('../models/NGOs');


router
    .get('/aboutTab', (req, res) => {
        res.render('partials/about')
    })
    // .get('/donationTab', (req, res) => {
    //     res.render('partials/donation')
    // })
    .get('/eventTab', async(req, res) => {
        const eventList = await Event.find()
            // console.log(eventList);
        res.render('partials/events', { eventList })
    })
    .get('/statusTab', (req, res) => {
        res.render('partials/status')
    })
    .post('/createnewNGO', async(req, res, next) => {
        const newNGO = await new NGO(req.body)
        newNGO.save()
            .then(res => {
                console.log("New NGO added successfully!!")
                res.json({ success: true })
            })
            .catch(err => {
                console.log("Error while adding NGO");
                console.log(err);
            })
    })


module.exports = router