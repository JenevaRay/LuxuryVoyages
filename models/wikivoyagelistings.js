const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class wikivoyagelistings extends Model {}

wikivoyagelistings.init(
  {
    // note: the organization of this data is from another program entirely.  See lib/helper_scripts/import_csv.py.
    // For simplicity, keeping column names as they are.
    // index is a field which we can safely ignore, it seems to be a duplicate of the id field (can remove, but...  quick and dirty).

    // it's worth noting that this data is *sparse*.  that means that correlated data will be in other fields.
    // String lengths are per the max length per field in provided CSV file.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    article: {
      type: DataTypes.STRING(56),
    },
    type: {
      type: DataTypes.STRING(25),
    },
    title: {
      type: DataTypes.STRING(178),
    },
    alt: {
      type: DataTypes.STRING(481),
    },
    wikidata: {
      type: DataTypes.STRING(9),
    },
    wikipedia: {
      type: DataTypes.BOOLEAN,
    },
    address: {
      type: DataTypes.STRING(455),
    },
    directions: {
      type: DataTypes.STRING(1599),
    },
    phone: {
      type: DataTypes.STRING(152),
    },
    tollFree: {
      type: DataTypes.STRING(102),
    },
    email: {
      type: DataTypes.STRING(59),
    },
    fax: {
      type: DataTypes.STRING(83),
    },
    url: {
      type: DataTypes.STRING(1041),
    },
    hours: {
      type: DataTypes.STRING(671),
    },
    checkIn: {
      type: DataTypes.STRING(139),
    },
    checkOut: {
      type: DataTypes.STRING(389),
    },
    image: {
      type: DataTypes.STRING(526),
    },
    price: {
      type: DataTypes.STRING(1190),
    },
    latitude: {
      type: DataTypes.DECIMAL(38, 16),
    },
    longitude: {
      type: DataTypes.DECIMAL(38, 17),
    },
    wifi: {
      type: DataTypes.BOOLEAN,
    },
    accessibility: {
      type: DataTypes.BOOLEAN,
    },
    lastEdit: {
      type: DataTypes.STRING(12),
    },
    description: {
      type: DataTypes.STRING(6113),
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: "wikivoyagelistings",
  },
);

module.exports = wikivoyagelistings;
