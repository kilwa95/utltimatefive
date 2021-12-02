const Match = require('../models/sequelize/Match');

exports.saveMatch = async (data) => {
    try {
        const match = new Match(data);
        return await match.save();
    } catch (error) {
        console.error(error)
    }
}
exports.findAllMatches = async () => {
    try {
        return await Match.findAll();
    } catch (error) {
        console.error(error)
    }
}
exports.findMatchById = async (matchId) => {
    try {
        return await Match.findByPk(matchId);
    } catch (error) {
        console.error(error)
    }
}
exports.findMatchByLevelId = async (levelId) => {
    try {
        return await Match.findAll({
            where: {
                levelId: levelId
            }
        });
    } catch (error) {
        console.error(error)
    }
}

exports.findMatchByUserId = async (matchId) => {
    try {
        return await Match.findAll({
            where: {
                userId: matchId
            }
        });
    } catch (error) {
        console.error(error)
    }
}
exports.findMatchByUserIdAndMatchId = async (userId, matchId) => {
    try {
        return await Match.findOne({
            where: {
                userId: userId,
                id: matchId
            }
        });
    } catch (error) {
        console.error(error)
    }
}
exports.updateMatch = async (matchId, data) => {
    try {
        return await Match.update(data, {
            where: {
                id: matchId
            }
        });
    } catch (error) {
        console.error(error)
    }
}
exports.deleteMatch = async (matchId) => {
    try {
        return await Match.destroy({
            where: {
                id: matchId
            }
        });
    } catch (error) {
        console.error(error)
    }
}




