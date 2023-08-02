const express = require('express')
const wikiListings = require('./wikivoyagelistings')
// const amadeus = require ('./amadeus')
const user = require('./user')
const router = express.Router()


router.use('/wiki-listings', wikiListings)
// router.use('/amadeus', amadeus)
router.use('/user', user)

module.exports = router
