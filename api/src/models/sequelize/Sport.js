const {Model,DataTypes} = require('sequelize');
const connection = require('../../config/sequelize');

class Sport extends Model {}
Sport.init(
    {
        name:{ type: DataTypes.STRING,allowNull:false},
    },
    {
        sequelize: connection,
        modelName: 'Sport',
    }
)


Sport.sync({
	alter: true
})

module.exports = Sport;
