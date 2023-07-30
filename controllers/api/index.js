const express = require('express')
const wikiListings = require('./wikivoyagelistings')

const router = express.Router()

router.use('/wiki-listings', wikiListings)

module.exports = router
