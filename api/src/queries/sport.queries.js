const Sport = require('../models/sequelize/Sport');

exports.findAllSports = async () => {
    try {
        return await Sport.findAll();
    } catch (error) {
        console.error(error);
    }
}

exports.findSportById = async (sid) => {
    try {
        return await Sport.findByPk(sid);
    } catch (error) {
        console.error(error);
    }
}

exports.findSportByName = async (name) => {
    try {
        return await Sport.findOne({
            where: {
                name: name
            }
        });
    } catch (error) {
        console.error(error);
    }
}

exports.saveSport = async (data) => {
    try {
        const sport = new Sport(data);
        return await sport.save();
    } catch (error) {
        console.error(error)
    }
}

exports.updateSportQuery = async (sid, data) => {
    try {
        return await Sport.update(data, {
            where: {
                id: sid
            },
            returning: true,
            plain: true
        });
    } catch (error) {
        console.error(error);
    }
}

exports.removeSport = async (sid) => {
    try {
        return await Sport.destroy({
            where: {
                id: sid
            }
        });
    } catch (error) {
        console.error(error);
    }
}
