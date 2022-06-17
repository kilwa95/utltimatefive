const { Model, DataTypes } = require('sequelize')
const connection = require('../../config/sequelize')
const Match = require('./Match')
const Team = require('./Team')

class Match_team extends Model {}

Match_team.init(
  {},
  {
    sequelize: connection,
    modelName: 'Match_team',
  },
)

Match.belongsToMany(Team, {
  through: 'Match_team',
  as: 'teams',
  onDelete: 'cascade',
})
Team.belongsToMany(Match, { through: 'Match_team', onDelete: 'cascade' })

Match_team.sync({
  alter: true,
})

module.exports = Match_team
