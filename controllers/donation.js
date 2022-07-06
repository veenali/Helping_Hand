const nodemailer = require("nodemailer");
const Donation = require('../models/Donation');
const User = require("../models/User");

module.exports.postDonate = async(req, res, next) => {
    // console.log(req.body)

    const donation = await new Donation(req.body)
    const user = await User.findOne({ email: req.cookies.email })
    const data = {
            ...user,
            category: req.body.category,
            additionalDetails: req.body.additionalDetails,
            pickupAddress: req.body.pickupAddress
        }
        // if (!donation.user.incudes(user._id)) {
    donation.user.push(data)
        // }

    console.log(donation);

    // await donation.save()
    //     .then(async data => {
    //         let transporter = nodemailer.createTransport({
    //             host: "smtp.gmail.com",
    //             port: 587,
    //             secure: false, // true for 465, false for other ports
    //             auth: {
    //                 user: process.env.EMAIL, // generated ethereal user
    //                 pass: process.env.PASSWORD, // generated ethereal password
    //             },
    //         });

    //         const mailOptions = {
    //             from: 'veenalinewalkar-cmpn@atharvacoe.ac.in', // sender address
    //             to: "veenalinewalkar1@gmail.com", // list of receivers
    //             subject: "Donation successfull", // Subject line
    //             text: "Your donation was successfull", // plain text body
    //             html: `<p>Your donatinon to NGO ${req.body.NGOname} was successfully done. You can track the status of your donation by visiting our site and navigating to status tab.</p>`, // html body
    //         }
    //         let info = await transporter.sendMail(mailOptions);

    //         if (info) {
    //             req.flash('success', "Your donation has been initiated. You can check your status in status tab")
    //             return res.redirect('/')
    //         } else {
    //             // return res.send("DONATED")
    //             req.flash('error', "Some error occurred")
    //             return res.redirect('/')
    //         }

    //         // res.json({
    //         //     succes: true,
    //         //     message: "Donation data saved successfully"
    //         // })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.send("Donation not successfull")
    //     })


}