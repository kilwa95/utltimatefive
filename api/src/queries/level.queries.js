const Level = require('../models/sequelize/Level');

exports.findAllLevels = async () => {
    try {
        return await Level.findAll();
    } catch (error) {
        console.error(error)
    }
}

exports.findLevelById = async (id) => {
    try {
        return await Level.findByPk(id);
    } catch (error) {
        console.error(error)
    }
}

exports.findLevelByName = async (name) => {
    try {
        return await Level.findOne({
            where: {
                name: name
            }
        });
    } catch (error) {
        console.error(error)
    }
}

exports.saveLevel = async (data) => {
    try {
        const level = new Level(data);
        return await level.save();
    } catch (error) {
        console.error(error)
    }
}

exports.updateLevelQuery = async (lid, data) => {
    try {
        const level = await Level.update(data, {
            where: {
                id: lid
            },
            returning: true,
            plain: true
        });
        return level[1];
    } catch (error) {
        console.error(error)
    }
}

exports.removeLevel = async (lid, data) => {
    try {
        return await Level.destroy({
            where: {
                id: lid
            }
        });
    } catch (error) {
        console.error(error)
    }
}