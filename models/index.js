const wikivoyagelistings = require('./wikivoyagelistings')
const Itineraries = require('./itineraries')
const Users = require('./users')

Itineraries.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Itineraries.hasOne(wikivoyagelistings, {
    foreignKey: 'wiki_id'
})

module.exports = { wikivoyagelistings, Itineraries, Users }