const {Model,DataTypes} = require('sequelize');
const connection = require('../../config/sequelize');

class Level extends Model {}
Level.init(
    {
        name:{ type: DataTypes.STRING,allowNull:false},
    },
    {
        sequelize: connection,
        modelName: 'Level',
    }
)

Level.sync({
	alter: true
})

module.exports = Level;
