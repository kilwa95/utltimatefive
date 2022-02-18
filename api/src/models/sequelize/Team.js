const {Model,DataTypes} = require('sequelize');
const connection = require('../../config/sequelize');
const User = require('./User');
const Level = require('./Level');

class Team extends Model {}
Team.init(
    {
        name:{ type: DataTypes.STRING,allowNull:false},
    },
    {
        sequelize: connection,
        modelName: 'Team',
    }
)

Team.belongsTo(User, { as: 'captine' });
User.hasMany(Team, { foreignKey: 'captineId', as: 'teams' });

Team.belongsTo(Level, { as: 'level' });
Level.hasMany(Team, { foreignKey: 'levelId', as: 'teams' });

Team.sync({
	alter: true
})

module.exports = Team;
