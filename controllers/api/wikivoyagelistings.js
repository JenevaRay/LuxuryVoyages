const express = require("express");
const { wikivoyagelistings } = require("../../models");
const { Op } = require("sequelize");

const router = express.Router();

async function removeEmpty(obj) {
  return await obj.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null), // eslint-disable-line no-unused-vars
    ); 
  });
}

router.get("/", async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  const fiveListings = await wikivoyagelistings.findAll({
    raw: true,
    limit: 5,
  });
  // note: this returns an array of results with null values filtered out by key.
  res.json(await removeEmpty(fiveListings));
});

router.get("/bounds", async (req, res) => {
  try {
    const { south, north, west, east } = req.query;
    if (Number(south) && Number(north) && Number(west) && Number(east)) {
      const twentyListings = await wikivoyagelistings.findAll({
        raw: true,
        limit: 20,
        where: {
          latitude: {
            [Op.between]: [Number(south), Number(north)],
          },
          longitude: {
            [Op.between]: [Number(west), Number(east)],
          },
        },
      });
      // note: this returns an array of results with null values filtered out by key.
      res.status(200).json(await removeEmpty(twentyListings));
    } else {
      res
        .status(400)
        .json({
          "ERROR, malformed QUERY, do QUERY like: ":
            "?south=51.6&north=51.7&west=5.2&east=5.4",
        });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        "ERROR, do QUERY like: ": "?south=51.6&north=51.7&west=5.2&east=5.4",
      });
  }
});

router.get("/:id", async (req, res) => {
  if (Number(req.params.id)) {
    console.log(`${req.method}: ${req.baseUrl}`);
    const oneListing = await wikivoyagelistings.findByPk(req.params.id);
    // note: this returns an array of results with ALL VALUES including null.
    res.json(oneListing);
  } else {
    res.status(404);
  }
});

module.exports = router;
