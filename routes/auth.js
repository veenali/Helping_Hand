const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const router = express.Router({ mergeParams: true })
const nodemailer = require("nodemailer");



const User = require('../models/User')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
// }


router
    .get('/loginSignUp', isLoggedIn, (req, res, next) => {
        res.render("loginSignUp")
    })
    .post('/register', isLoggedIn, async(req, res, next) => {
        // res.send(req.body)
        const { username, email, contact, password, usertype } = req.body
        try {
            if (!username || !email || !contact) res.send("Fields are missing!!")
            const user = await User.findOne({ email: email })
            if (user) {
                res.send("User already exists!!");
            } else {
                const newUser = await new User({
                    username,
                    email,
                    contact,
                    password,
                    usertype
                })
                await newUser.save(async function(err, newUser) {
                    if (err) {
                        return console.log("Mongo register error = " + err);
                    }
                    // console.log(newUser);
                    res.cookie('email', newUser.email)
                    res.cookie('username', newUser.username)
                    res.cookie('usertype', newUser.usertype)
                    res.cookie('contact', newUser.contact)

                    //welcome mail
                    if (newUser.usertype == 'reguser') {
                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: process.env.EMAIL, // generated ethereal user
                                pass: process.env.PASSWORD, // generated ethereal password
                            },
                        });

                        const mailOptions = {
                            from: 'veenalinewalkar-cmpn@atharvacoe.ac.in', // sender address
                            to: "veenalinewalkar1@gmail.com", // list of receivers
                            subject: "Welcome!!", // Subject line
                            text: "Welcome to Helping Hand", // plain text body
                            html: `<p>Welcome to Helping Hand!!</p>`, // html body
                        }
                        let info = await transporter.sendMail(mailOptions);
                        if (info) {
                            // res.send("Successfull")
                            req.flash('success', 'Registered successfully')
                            return res.redirect('/')
                        } else {
                            return res.redirect('/')
                        }
                    } else if (usertype == 'ngo') {
                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: process.env.EMAIL, // generated ethereal user
                                pass: process.env.PASSWORD, // generated ethereal password
                            },
                        });

                        const mailOptions = {
                            from: 'veenalinewalkar-cmpn@atharvacoe.ac.in', // sender address
                            to: "veenalinewalkar1@gmail.com", // list of receivers
                            subject: "Welcome!!", // Subject line
                            text: "Welcome to Helping Hand", // plain text body
                            html: `<p>Welcome to Helping Hand!! We will check the certificate uploaded and our admin will get back to you soon</p>`, // html body
                        }
                        let info = await transporter.sendMail(mailOptions);
                        if (info) {
                            // res.send("Successfull")
                            req.flash('success', 'Registered successfully')
                            return res.redirect('/')
                        } else {
                            return res.redirect('/')
                        }
                    } else if (usertype == 'hotel') {
                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: process.env.EMAIL, // generated ethereal user
                                pass: process.env.PASSWORD, // generated ethereal password
                            },
                        });

                        const mailOptions = {
                            from: 'veenalinewalkar-cmpn@atharvacoe.ac.in', // sender address
                            to: "veenalinewalkar1@gmail.com", // list of receivers
                            subject: "Welcome!!", // Subject line
                            text: "Welcome to Helping Hand", // plain text body
                            html: `<p>Welcome to Helping Hand!! Our admin will get back to you!!</p>`, // html body
                        }
                        let info = await transporter.sendMail(mailOptions);
                        if (info) {
                            // res.send("Successfull")
                            req.flash('success', 'Registered successfully')
                            return res.redirect('/')
                        } else {
                            return res.redirect('/')
                        }
                    }
                })
            }
        } catch (err) {
            res.send("Error while registering the user")
        }
    })
    .post('/login', isLoggedIn, async(req, res, next) => {
        try {
            if (!req.body) res.send("Request body is empty")
            const { email, password } = req.body
            const user = await User.findOne({ email });
            if (user) {
                // console.log("Logged in user : ", user);
                if (user.password === password) {
                    // res.send("User found. Logging in.....")
                    res.cookie('email', user.email)
                    res.cookie('usertype', user.usertype)
                    res.cookie('username', user.username)
                    res.cookie('contact', user.contact)
                    return res.redirect('/')
                }
                return res.send("Some error occured")
            } else {
                res.send("User not registered!!")
            }
        } catch (error) {
            console.log("Login error = " + error);
        }
    })
    .get('/logout', (req, res) => {
        res.clearCookie('username')
        res.clearCookie('email')
        res.clearCookie('usertype')
        res.redirect('/')
    })

module.exports = router