const express = require('express')
const wikiListings = require('./wikivoyagelistings')
const user = require('./user')
const itineraries = require('./itineraries')
const router = express.Router()

router.use('/wiki-listings', wikiListings)
router.use('/user', user)
router.use('/itin', itineraries)

module.exports = router
