const express = require("express");
const wikiListings = require("./wikivoyagelistings");
const user = require("./user");
const router = express.Router();
const itineraries = require("./itineraries");

router.use("/wiki-listings", wikiListings);
router.use("/user", user);
router.use("/itin", itineraries);

module.exports = router;
