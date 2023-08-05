const express = require('express')
const apiRoutes = require('./api')

const router = express.Router()

router.use('/api/', apiRoutes)

//route for homepage
router.get('/', (req,res) => {
    res.render('homepage');
})

router.get('/login', (req, res) => {
    res.render('login');
  });
  
router.get('/view-wiki/', async (req, res) => {
    res.render('view-wiki')
})

module.exports = router
