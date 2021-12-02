const {Model,DataTypes} = require('sequelize');
const connection = require('../../config/sequelize');
const User = require('./User');
const Level = require('./Level');

class Match extends Model {}
Match.init(
    {
        name:{ type: DataTypes.STRING,allowNull:false},
        status:{ type: DataTypes.STRING,allowNull:false,defaultValue:'created'},
    },
    {
        sequelize: connection,
        modelName: 'Match',
    }
)

Match.belongsTo(User, { as: 'organizer' });
User.hasMany(Match, { foreignKey: 'organizerId', as: 'matchs' });

Match.belongsTo(Level, { as: 'level' });
Level.hasMany(Match, { foreignKey: 'levelId', as: 'matchs' });

Match.sync({
	alter: true
})

module.exports = Match;
