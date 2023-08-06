const express = require("express");
const { Users } = require("../../models");

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).redirect("/");
  }
  try {
    res.render("login");
  } catch (err) {
    res.json(err);
  }
});

router.post("/new", async (req, res) => {
  const { username, password, passverif } = req.body;
  if (!username || !password || !passverif || password !== passverif) {
    return res.status(400).send("Username and password are required.");
  }
  let failed = false;
  Users.create(req.body).then((res) => {
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = username;
      req.session.user_id = res.id;
      
    });  
  }).catch((err) => {
    // console.log(err)
    res.json(err)
    failed = true
  });
  if (!failed) {
    res.status(201).send("User registered successfully");
  }
});
 
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const result = await Users.findOne({
      where: { username },
    });
    if (result != null && (await result.checkPassword(password))) {
      console.log("Success!")
      req.session.loggedIn = true;
      req.session.username = username;
      req.session.user_id = result.id;
      req.session.save();
      res.status(200).json("Success!");
    } else {
      console.log()
      res
        .status(401)
        .send("Correct username and password are required.");
    }
  } else {
    res.status(400).send("Username and password are required.");
  }
});

router.get("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
  }
});

module.exports = router;
