const express = require('express')
const { Users } = require('../../models')

const router = express.Router()

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  let register = false

  if (req.query.register) {
    register = true
  }
  try {
    res.render('login', { register })
  } catch (err) {
    res.json(err)
  }
})

router.post('/new', async (req, res) => {
  const { username, password, passverif } = req.body
  if (!username || !password || !passverif || password !== passverif) {
    return res.status(400).send('Username and password are required.')
  }
  const result = await Users.create(req.body)
  req.session.save(() => {
    req.session.loggedIn = true
    req.session.username = username
    req.session.user_id = result.id
    res.status(201).send('User registered successfully')
  })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    const result = await Users.findOne({
      // raw: true,
      where: { username }
    })
    if (result != null && await result.checkPassword(password)) {
      req.session.save(() => {
        req.session.loggedIn = true
        req.session.username = username
        req.session.user_id = result.id
        res.status(200).send('Login successful!')
      })
    } else {
      return res.status(401).send('Correct username and password are required.')
    }
  } else {
    return res.status(400).send('Username and password are required.')
  }
})

router.get('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).redirect('/')
    })
  }
})

module.exports = router
