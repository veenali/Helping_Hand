const express = require('express');
const router = express.Router({ mergeParams: true })
const { postDonate } = require('../controllers/donation');
const { isAuthenticated } = require('../middleware/auth');
// const Donation = require('../models/Donation');
// const NGO = require('../models/NGOs');
const NGOs = require('../models/NGOs')

router
    .get('/donate/fillDetails/:id', async(req, res, next) => {
        const { id } = req.params
        const ngo = await NGOs.findOne({ _id: id })
            // console.log(id);
            // console.log("NGO=", ngo);
        res.render("donationForm", { ngo })
    })
    .get('/donationTab', async(req, res, next) => {
        const list = await NGOs.find()
            // console.log(list);
        res.render('partials/donation', { list })
    })
    .post('/donate', isAuthenticated, postDonate)


module.exports = router