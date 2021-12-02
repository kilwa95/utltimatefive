const {Model,DataTypes} = require('sequelize');
const connection = require('../../config/sequelize');

class Address extends Model {}

Address.init(
    {
        road:{ type: DataTypes.STRING,allowNull:false},
        postalcode:{ type: DataTypes.INTEGER,allowNull:false},
        city:{ type: DataTypes.STRING,allowNull:false},
        country:{ type: DataTypes.STRING,allowNull:false},
    },
    {
        sequelize: connection,
        modelName: 'Address',
    }
)

Address.sync({
	alter: true
})

module.exports = Address;
