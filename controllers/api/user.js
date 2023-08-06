const express = require("express");
const { Users } = require("../../models");

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
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
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.username = username;
        req.session.user_id = result.id;
        res.status(200);
      });
    } else {
      return res
        .status(401)
        .send("Correct username and password are required.");
    }
  } else {
    return res.status(400).send("Username and password are required.");
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
