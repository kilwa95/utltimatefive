const User = require('../models/sequelize/User');

exports.saveUser = async (data) => {
    try {
        const user = new User(data);
        return await user.save();
    } catch (error) {
        console.error(error)
    }
}

exports.findAllUsers = async () => {
    try {
        return await User.findAll({});
    } catch (error) {
        console.error(error)
    }
}

exports.findUserById = async (uid) => {
    try {
        return await User.findOne({
            where: {
                id: uid
            }
        });
    } catch (error) {
        console.error(error)
    }
}

exports.updateUser = async (data,uid) => {
    try {
        return await User.update(data, {
            where: {
                id: uid
            }
        });
    } catch (error) {
        console.error(error)
    }
}

exports.deleteUser = async (uid) => {
    try {
        return await User.destroy({
            where: {
                id: uid
            }
        });
    } catch (error) {
        console.error(error)
    }
}