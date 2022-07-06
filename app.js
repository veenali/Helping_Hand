require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const socketio = require('socket.io')
const Razorpay = require('razorpay');
const session = require('express-session');
const flash = require('connect-flash');

var cookieParser = require('cookie-parser')

app.use(session({
    secret: 'ssshhhhitsasecret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());


// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.use(cookieParser())


const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI;
const dbURL = 'mongodb://localhost:27017/helping-hand'
mongoose.connect(dbURL)
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(err => console.log(err));


const userRoutes = require('./routes/auth')
const donationRoutes = require('./routes/donation')
const generalRoutes = require('./routes/general')
const eventRoutes = require('./routes/event')

app.use((req, res, next) => {
    res.locals.username = req.cookies.username
    res.locals.email = req.cookies.email
    res.locals.usertype = req.cookies.usertype
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
        // res.locals.currentUser = req.user
    next()
})


app.use('/', userRoutes);
app.use('/', donationRoutes)
app.use('/', generalRoutes)
app.use('/', eventRoutes)

app.get('/', (req, res) => {
    res.render('index')
})


app.post('/test', (req, res) => {
    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEYID,
        key_secret: process.env.RAZORPAY_KEYSECRET,
    });
    instance.orders.create({
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
    })
    res.send(req.body)
})






const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

const io = socketio(server)

io.on('connection', socket => {
    console.log("New user connected")

    socket.on('donation_initiated', data => {
        console.log("donation initiated = ", data)
            // console.log(io)
            // socket.emit('donation_start', { data })
        io.sockets.emit('donation_start', { data: data.data })
    })

    // socket.on('donation_start', data => {
    //     console.log("DONATION START = ", data)
    // })
})