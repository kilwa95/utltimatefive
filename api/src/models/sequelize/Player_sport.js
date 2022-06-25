const { Model, DataTypes } = require('sequelize');
const connection = require('../../config/sequelize');
const User = require('./User');
const Sport = require('./Sport');

class Player_sport extends Model {}

Player_sport.init(
  {},
  {
    sequelize: connection,
    modelName: 'Player_sport',
  }
);

Sport.belongsToMany(User, { as: 'players', through: 'Player_sport' });
User.belongsToMany(Sport, { as: 'sports', through: 'Player_sport' });

Player_sport.sync({
  alter: true,
});

module.exports = Player_sport;