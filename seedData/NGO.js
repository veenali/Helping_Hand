const NGO = require('../models/NGOs')
const mongoose = require('mongoose');

async function NgoDataFilling() {
    const data = [{
            NGOName: "Akshara Center",
            img: '/images/ngo1.jpg',
            address: 'Neelambari 501, Road No 86, Off Gokhale Road, Dadar (W) Mumbai 400028 Maharashtra',
            requirements: ['Need 50 kgs of wheat grains', 'SSC textbooks']
        },
        {
            NGOName: "Educate girls",
            img: '/images/ngo3.jpg',
            address: 'Suite No. 411, Fourth Floor Reliable Business Centre, Off New Link Road Oshiwara, Andheri (West),',
            requirements: ['Sanitary Pads', 'Food and Beverages', 'Warm clothes', 'SSC textbooks']
        },
        {
            NGOName: "Antarang Foundation",
            img: '/images/ngo2.jpg',
            address: 'Neelambari 501, Road No 86, Off Gokhale Road, Dadar (W) Mumbai 400028 Maharashtra',
            requirements: ['Need 50 kgs of wheat grains', 'Warm clothes']
        },
        {
            NGOName: "Akshara Center",
            img: '/images/ngo4.jpg',
            address: 'Neelambari 501, Road No 86, Off Gokhale Road, Dadar (W) Mumbai 400028 Maharashtra',
            requirements: ['Need 50 kgs of wheat grains', 'SSC textbooks']
        },
        {
            NGOName: "Akshara Center",
            img: '/images/ngo4.jpg',
            address: 'Neelambari 501, Road No 86, Off Gokhale Road, Dadar (W) Mumbai 400028 Maharashtra',
            requirements: ['Need 50 kgs of wheat grains', 'SSC textbooks']
        }
    ]

    const mongo_uri = process.env.MONGO_URI;
    const dbURL = 'mongodb://localhost:27017/helping-hand'
    mongoose.connect(dbURL)
        .then(() => {
            console.log("Connected to DB")
        })
        .catch(err => console.log(err));


    const enterData = await NGO.insertMany(data)
    if (enterData) console.log(enterData);
}

NgoDataFilling()