const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Itineraries extends Model {
}
Itineraries.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, starttime: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }, stoptime: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }, wiki_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }, user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, latitude: {
      type: DataTypes.DECIMAL(38, 16)
    }, longitude: {
      type: DataTypes.DECIMAL(38, 17)
    }, summary: {
      type: DataTypes.STRING,
      allowNull: false
    }, details: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    updatedAt: false,
    createdAt: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'itineraries'
  }
)

module.exports = Itineraries
