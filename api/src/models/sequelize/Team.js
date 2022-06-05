const { Model, DataTypes } = require('sequelize')
const connection = require('../../config/sequelize')
const User = require('./User')
const Level = require('./Level')
const Match = require('./Match')

class Team extends Model {}
Team.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: connection,
    modelName: 'Team',
  },
)

Team.belongsTo(User, { as: 'admin' })
User.hasMany(Team, { foreignKey: 'adminId', as: 'teams' })

Team.belongsTo(Level, { as: 'level' })
Level.hasMany(Team, { foreignKey: 'levelId', as: 'teams' })

Team.belongsTo(Match, { as: 'match' })
Match.hasMany(Team, { foreignKey: 'matchId', as: 'teams' })

Team.sync({
  alter: true,
})

module.exports = Team
