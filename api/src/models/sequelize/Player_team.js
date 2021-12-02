const { Model, DataTypes } = require('sequelize');
const connection = require('../../config/sequelize');
const User = require('./User');
const Team = require('./Team');

class Player_team extends Model {}

Player_team.init(
  {},
  {
    sequelize: connection,
    modelName: 'Player_team',
  }
);

Team.belongsToMany(User, { as: 'players', through: 'Player_team' });
User.belongsToMany(Team, { as: 'teams', through: 'Player_team' });

Player_team.sync({
  alter: true,
});

module.exports = Player_team;