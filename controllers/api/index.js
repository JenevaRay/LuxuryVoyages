const express = require('express')
const wikiListings = require('./wikivoyagelistings')
// const amadeus = require ('./amadeus')
// const googleMaps = require('./google-maps')
const user = require('./user')
const router = express.Router()
const itineraries = require('./itineraries')

// router.use('/google-maps', googleMaps)
router.use('/wiki-listings', wikiListings)
// router.use('/amadeus', amadeus)
router.use('/user', user)
router.use('/itin', itineraries)

module.exports = router
