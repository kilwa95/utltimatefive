const { Model, DataTypes } = require('sequelize')
const connection = require('../../config/sequelize')
const User = require('./User')
const Level = require('./Level')

class Match extends Model {}
Match.init(
  {
    salle: { type: DataTypes.STRING, allowNull: false },
    ville: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    slots: { type: DataTypes.DATEONLY, allowNull: true },
    square: { type: DataTypes.INTEGER, allowNull: true },
    price: { type: DataTypes.INTEGER, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'created',
    },
  },
  {
    sequelize: connection,
    modelName: 'Match',
  },
)

Match.belongsTo(User, { as: 'organizer' })
User.hasMany(Match, { foreignKey: 'organizerId', as: 'matchs' })

Match.belongsTo(Level, { as: 'level' })
Level.hasMany(Match, { foreignKey: 'levelId', as: 'matchs' })

Match.sync({
  alter: true,
})

module.exports = Match
