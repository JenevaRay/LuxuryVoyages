const express = require("express");
const apiRoutes = require("./api");
const { Itineraries } = require("../models");

const router = express.Router();

router.use("/api/", apiRoutes);

router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).redirect("/");
  } else {
    res.render("login", {
      loggedIn: req.session.loggedIn,
    });
  }
});

router.get("/view-wiki/", async (req, res) => {
  res.render("view-wiki", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/my-itin", async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const rawitins = await Itineraries.findAll({
        raw: true,
        where: {
          user_id: req.session.user_id,
        },
        order: [["starttime", "ASC"]],
      });
      const itineraries = [];
      for (let row of rawitins) {
        itineraries.push({
          latitude: row.latitude,
          longitude: row.longitude,
          summary: row.summary ? row.summary : "link",
          details: row.details,
          starttime: row.starttime,
          stoptime: row.stoptime,
        });
      }
      res.render("my-schedule", {
        loggedIn: req.session.loggedIn,
        itineraries: itineraries,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.redirect("/view-wiki/?lat=0&lng=0");
  }
});

router.get("/signup", async (req, res) => {
  res.render("signup", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/signout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
  }
});

module.exports = router;
