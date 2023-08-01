const express = require('express')
const apiRoutes = require('./api')

const router = express.Router()

router.use('/api/', apiRoutes)

// might move this to another file.
const { wikivoyagelistings } = require('../models')
const { Op } = require('sequelize')

async function removeEmpty(obj) {
    return await obj.map(obj => {
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null)) // eslint-disable-line no-unused-vars
    })
}

router.get('/view-wiki/', async (req, res) => {
    try {
        const { latLow, latHigh, longLow, longHigh } = req.query
        if ( Number(latLow) && Number(latHigh) && Number(longLow) && Number(longHigh)) {
            // [Number(latLow), Number(latHigh), Number(longLow), Number(longHigh)]
            const twentyListings = await wikivoyagelistings.findAll({
                raw: true,
                limit: 20,
                where: {
                    latitude: {
                        [Op.between]: [Number(latLow), Number(latHigh)]
                    }, longitude: {
                        [Op.between]: [Number(longLow), Number(longHigh)]
                    }
                }
            })
            console.log(twentyListings)
            // res.status(200).json(await removeEmpty(twentyListings))
            res.render('view-wiki', removeEmpty(twentyListings))
        } else {
            res.status(400).json({"ERROR, malformed QUERY, do QUERY like: ": '?latLow=51.6&latHigh=51.7&longLow=5.2&longHigh=5.4'})
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({"ERROR, do QUERY like: ": '?latLow=51.6&latHigh=51.7&longLow=5.2&longHigh=5.4'})
    }
    // console.log(`${req.method}: ${req.baseUrl}`)
    // const fiveListings = await wikivoyagelistings.findAll({
    //     raw: true,
    //     limit: 5,
    // })
    // // note: this returns an array of results with null values filtered out by key.
    // res.json(await removeEmpty(fiveListings))
})

module.exports = router


module.exports = router
