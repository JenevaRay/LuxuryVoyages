const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')
const client = new Client({
    key: process.env.GOOGLE_MAPS_API_KEY
})

// // console.log(results)

const router = express.Router()

async function mapsAPI() {
    client.elevation({
        params: {
            locations: [{ lat: 45, lng: -110 }],
            // key: "asdf"
        },
        timeout: 1000
    }).then((r)=>{
        console.log(r.data.results[0].elevation)
    }).catch((e)=>{
        console.log(e.response.data.error_message)
    })
}
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

mapsAPI()

// amadeusAPI()

module.exports = router
