const {Model,DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');
const connection = require('../../config/sequelize');
const Level = require('./Level');

class User extends Model {}
User.init(
    {
        firstName:{ type: DataTypes.STRING,allowNull:false},
        lastName:{ type: DataTypes.STRING,allowNull:false},
        email:{ type: DataTypes.STRING,allowNull:false,unique:true,validate:{isEmail:true}},
 
        password:{ type: DataTypes.STRING,allowNull:false,unique:true},
        enable:{ type: DataTypes.BOOLEAN,defaultValue:true},
        roles:{ type: DataTypes.ARRAY(DataTypes.STRING),allowNull:false,defaultValue:['captain','user']},
        birthday:{ type: DataTypes.DATEONLY,allowNull:true},
        status:{ type: DataTypes.STRING,allowNull:false,defaultValue:'created'},
    },
    {
        sequelize: connection,
        modelName: 'User',
    }
)

const haschPassword = async (user) => {
    console.log("beforeUpdate",user);
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
}

User.belongsTo(Level, { as: 'level'});
Level.hasMany(User, { foreignKey: 'levelId', as: 'users'});


User.addHook('beforeCreate',haschPassword)
User.addHook('beforeUpdate', haschPassword);


User.sync({
	alter: true
})

module.exports = User;
