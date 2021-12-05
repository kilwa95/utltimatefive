const { Model, DataTypes } = require('sequelize');
const connection = require('../../config/sequelize');
const User = require('./User');
const Match = require('./Match');

class Player_match extends Model {}

Player_match.init(
  {},
  {
    sequelize: connection,
    modelName: 'Player_match',
  }
);

Match.belongsToMany(User, { as: 'players', through: 'Player_match' });
User.belongsToMany(Match, { as: 'matchs', through: 'Player_match' });

Player_match.sync({
  alter: true,
});

module.exports = Player_match;