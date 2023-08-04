const express = require('express')
// import express from 'express'
const { Users, Itineraries, wikivoyagelistings } = require('../../models')
// import models from '../../models'
// const MODELS: any = models
// const { Users, Posts, Comments } = MODELS

const router = express.Router()

router.post('/', async (req, res) => {
  const { lat, lng } = req.query
  if ( Number(lat) && Number(lng) ) {
    console.log(body)
  }
  // try {
  //   if (req.session.loggedIn != null) {
  //     const request = {
  //       user_id: Number(req.session.user_id),
  //       ...req.body
  //     }
  //     const response = await Itinerary.create(request)
  //     // res.status(201).redirect('/dashboard')
  //   } else {
  //     // res.status(403).redirect('/dashboard')
  //   }
  // } catch (err) {
  //   console.log(err)
  
})

router.get('/', async (req, res) => {
  let {northeast, southwest} = req.body
  console.log(northeast)
  // get all itineraries by **map bounding box**
  try {
    const rawItineraries = await Itineraries.findAll()
    // console.log(rawItineraries)

  } catch (err) {
    console.log(err)
  }
})

// router.get('/:postid', async (req, res) => {
//   try {
//     const rawPost = await Posts.findOne({
//       raw: true,
//       where: { id: req.params.postid },
//       attributes: ['id', 'post_title', 'text', 'createdAt'],
//       include: [{
//         model: Users,
//         attributes: ['id', 'username']
//       }]
//     })
//     const commentsRaw = await Comments.findAll({
//       raw: true,
//       where: { post_id: req.params.postid },
//       include: [
//         { model: Users, attributes: ['username'] }
//       ]
//     })
//     const comments: any[] = []
//     for (const row of commentsRaw) {
//       comments.push({ id: row.id, comment: row.comment, createdAt: row.createdAt, username: row['user.username'] })
//     }
//     const post = { id: rawPost.id, post_title: rawPost.post_title, text: rawPost.text, createdAt: rawPost.createdAt, username: rawPost['user.username'], user_id: rawPost['user.id'] }
//     if (post.user_id === req.session.user_id) {
//       if (req.session.loggedIn != null && req.session.loggedIn !== false) {
//         // edit = (req.params.edit != null && (req.params.edit === 'true'))
//         if (req.query.edit === 'true' && req.query.edit !== undefined) {
//           res.render('post', { post, comments, loggedIn: req.session.loggedIn, edit: true })
//         }
//         res.render('post', { post, comments, loggedIn: req.session.loggedIn, edit: false })
//       } else {
//         res.status(403).redirect('/acct')
//       }
//     } else {
//       res.render('post', { post, comments, loggedIn: req.session.loggedIn, edit: false })
//     }
//   } catch (err) {
//     res.status(400).json(err)
//   }
// })

// router.put('/:postid', async (req, res) => {
//   if (req.session.loggedIn != null) {
//     try {
//       const originalPost = await Posts.findOne({ raw: true, where: { id: Number(req.params.postid) } })
//       if (originalPost.user_id === req.session.user_id) {
//         const request = {
//           id: Number(req.params.postid),
//           user_id: Number(req.session.user_id),
//           ...req.body
//         }
//         const response = await Posts.update(request, { where: { id: Number(req.params.postid) } })
//         res.status(204).json('Updated!')
//       } else {
//         res.status(403).redirect('/')
//       }
//     } catch (err) {
//       res.status(404).json(err)
//     }
//   } else {
//     res.status(403).redirect('/')
//   }
// })

// router.post('/:postid', async (req, res) => {
//   if (req.session.loggedIn != null) {
//     try {
//       const request = {
//         post_id: Number(req.params.postid),
//         user_id: Number(req.session.user_id),
//         ...req.body
//       }
//       const response = await Comments.create(request)
//       const rawPost = await Posts.findOne({
//         raw: true,
//         where: { id: req.params.postid },
//         attributes: ['id', 'post_title', 'text', 'createdAt'],
//         include: [{
//           model: Users,
//           attributes: ['id', 'username']
//         }]
//       })
//       const comments = await Comments.findAll({
//         raw: true,
//         where: { post_id: req.params.postid },
//         include: [
//           { model: Users, attributes: ['username'] }
//         ]
//       })
//       const post = { id: rawPost.id, post_title: rawPost.post_title, text: rawPost.text, createdAt: rawPost.createdAt, username: rawPost['user.username'] }
//       res.render('post', { post, comments, loggedIn: req.session.loggedIn })
//     } catch (err) {
//       res.status(404).json(err)
//     }
//   } else {
//     res.status(401).json('Must be logged in to create posts!')
//   }
// })

// router.delete('/:postid', async (req, res) => {
//   if (req.session.loggedIn != null) {
//     try {
//       const originalPost = await Posts.findOne({ raw: true, where: { id: Number(req.params.postid) } })
//       if (originalPost.user_id === req.session.user_id) {
//         const request = {
//           id: Number(req.params.postid),
//           user_id: Number(req.session.user_id),
//           ...req.body
//         }
//         const response = await Posts.destroy({ where: { id: Number(req.params.postid) } })
//         res.status(204).json('Deleted!')
//       } else {
//         res.status(403).redirect('/')
//       }
//     } catch (err) {
//       res.status(404).json(err)
//     }
//   } else {
//     res.status(403).redirect('/')
//   }
// })

module.exports = router 

// export { router as post }