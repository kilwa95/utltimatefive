const Team = require('../models/sequelize/Team');
const User = require('../models/sequelize/User');
const Level = require('../models/sequelize/Level');

exports.findAllTeams = async () => {
    try {
        return await Team.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: User,
                as: 'captine',
                attributes: ['id', 'firstName','lastName', 'email']
            }, 
            {
                model: Level,
                as: 'level',
                attributes: ['name']
            }
        ]
        });
    } catch (error) {
        console.error(error)
    }
}

exports.findAllTeamsByUserId = async (uid) => {
    try {
        return await Team.findAll({
            where: {
                captineId: uid
            }
        });
    } catch (error) {
        console.error(error)
    }
}

exports.findTeamById = async (tid) => {
    try {
        return await Team.findOne({
            attributes: ['id', 'name'],
            include: [{
                model: User,
                as: 'captine',
                attributes: ['id', 'firstName','lastName', 'email']
            },
            {
                model: Level,
                as: 'level',
                attributes: ['name']
            }
        ],
            where: {
                id: tid
            }
        });
    } catch (error) {
        console.error(error)
    }
}

exports.findTeamByName = async (name) => {
    try {
        return await Team.findOne({
            where: {
                name: name
            }
        });
    } catch (error) {
        console.error(error)
    }
}

exports.saveTeam = async (data) => {
    try {
        const team = new Team(data);
        return await team.save();
    } catch (error) {
        console.error(error)
    }
}

exports.updateTeamQuery = async (tid, data) => {
    try {
        return await Team.update(data, {
            where: {
                id: tid
            },
            returning: true,
            plain: true
        });
    } catch (error) {
        console.error(error)
    }
}

exports.removeTeam = async (tid) => {
    try {
        return await Team.destroy({
            where: {
                id: tid
            }
        });
    } catch (error) {
        console.error(error)
    }
}

