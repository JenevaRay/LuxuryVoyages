// const express = require('express')
// // const fetch = require('node-fetch')
// require('dotenv').config()
// const Amadeus = require('amadeus')
// const amadeus = new Amadeus()


// // console.log(results)

// const router = express.Router()

// async function amadeusAPI() {
//     // this is functioning and tested code.

//     // results = await amadeus.shopping.flightOffersSearch.get({
//     //     originLocationCode: 'SYD',
//     //     destinationLocationCode: 'BKK',
//     //     departureDate: '2023-10-10',
//     //     adults: 3
//     // })
//     // results = amadeus.referenceData.location('TNCA').get()
//     let results = await amadeus.referenceData.locations.pointsOfInterest.get({
//         // longitude: -70, latitude: 12.4
//         latitude: 40.7, longitude: -74
//     }).then((data)=>{console.log(data)}).catch((err)=>console.log(err))
//     console.log(results)
    
// }

// amadeusAPI()

// module.exports = router
