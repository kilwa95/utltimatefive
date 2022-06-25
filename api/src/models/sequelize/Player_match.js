const { Model, DataTypes } = require('sequelize')
const connection = require('../../config/sequelize')
const User = require('./User')
const Match = require('./Match')

class Player_match extends Model {}

Player_match.init(
  {},
  {
    sequelize: connection,
    modelName: 'Player_match',
  },
)

Match.belongsToMany(User, {
  through: 'Player_match',
  as: 'players',
  onDelete: 'cascade',
})
User.belongsToMany(Match, { through: 'Player_match', onDelete: 'cascade' })

Player_match.sync({
  alter: true,
})

module.exports = Player_match
