const { Model, DataTypes } = require('sequelize');
const connection = require('../../config/sequelize');
const User = require('./User');
const Match = require('./Match');

class Player_mattch extends Model {}

Player_mattch.init(
  {},
  {
    sequelize: connection,
    modelName: 'Player_mattch',
  }
);

Match.belongsToMany(User, { as: 'players', through: 'Player_mattch' });
User.belongsToMany(Match, { as: 'matchs', through: 'Player_mattch' });

Player_mattch.sync({
  alter: true,
});

module.exports = Player_mattch;