const express = require("express");
const { Users, Itineraries } = require("../../models");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const rawitins = await Itineraries.findAll({
      raw: true,
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    });
    const itins = [];
    for (let row of rawitins) {
      itins.push({
        latitude: row.latitude,
        longitude: row.longitude,
        summary: row.summary,
        details: row.details,
        username: row["user.username"],
      });
    }
    res.status(200).json(itins);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/bounds/", async (req, res) => {
  // get all itineraries by **map bounding box**
  const { north, east, south, west } = req.query;
  try {
    if (Number(south) && Number(north) && Number(west) && Number(east)) {
      const listings = await Itineraries.findAll({
        raw: true,
        limit: 100,
        where: {
          latitude: {
            [Op.between]: [Number(south), Number(north)],
          },
          longitude: {
            [Op.between]: [Number(west), Number(east)],
          },
        },
        include: [
          {
            model: Users,
            attributes: ["username"],
          },
        ],
      });
      const itins = [];
      for (let row of listings) {
        itins.push({
          owner: req.session.user_id == row.user_id,
          ...row,
        });
      }
      res.status(200).json(itins);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let {
      summary,
      details,
      wiki_id,
      latitude,
      longitude,
      starttime,
      stoptime,
    } = req.body;
    if (Number(latitude) && Number(longitude) && req.session.loggedIn != null) {
      Itineraries.create({
        starttime: starttime,
        stoptime: stoptime,
        private: false,
        user_id: Number(req.session.user_id),
        wiki_id: wiki_id ? wiki_id : null,
        latitude: latitude,
        longitude: longitude,
        summary: summary,
        details: details,
      })
        .then(() => {
          res.status(201).json("Submitted");
        })
        .catch(() => {
          res.status(405).json("Error adding to database");
        });
    } else {
      if (req.session.loggedIn == undefined) {
        res.status(401).json("Not logged in");
      } else {
        res.status(404).json("Error with submission body");
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  if (Number(req.params.id)) {
    try {
      const itinerary = await Itineraries.findOne({
        raw: true,
        where: { id: Number(req.params.id) },
      });
      if (itinerary.user_id === req.session.user_id) {
        await Itineraries.destroy({ where: { id: Number(req.params.id) } });
        res.status(204).json("Deleted!");
      } else {
        res.status(403).json("Denied");
      }
    } catch (err) {
      res.status(404).json(err);
    }
  } else {
    res.status(400).json("Malformed Query");
  }
});

module.exports = router;
