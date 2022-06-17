const Team = require('../models/sequelize/Team')
const User = require('../models/sequelize/User')
const Level = require('../models/sequelize/Level')
const Match = require('../models/sequelize/Match')
const Player_team = require('../models/sequelize/Player_team')
const Match_team = require('../models/sequelize/Match_team')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.findAllTeams = async () => {
  try {
    return await Team.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Level,
          as: 'level',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'membres',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    })
  } catch (error) {
    console.error(error)
  }
}

exports.findAllTeamsByUserId = async (uid) => {
  try {
    return await Team.findAll({
      where: {
        captineId: uid,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

exports.findTeamById = async (tid) => {
  try {
    return await Team.findOne({
      attributes: ['id', 'name'],
      include: [
        {
          model: Level,
          as: 'level',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'membres',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
      where: {
        id: tid,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

exports.findTeamByName = async (name) => {
  try {
    return await Team.findOne({
      where: {
        name: name,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

exports.saveTeam = async (data) => {
  try {
    const team = new Team(data)
    return await team.save()
  } catch (error) {
    console.error(error)
  }
}

exports.updateTeamQuery = async (tid, data) => {
  try {
    return await Team.update(data, {
      where: {
        id: tid,
      },
      returning: true,
      plain: true,
    })
  } catch (error) {
    console.error(error)
  }
}
exports.updateManyTeams = async (ids, data) => {
  try {
    return await Team.update(data, {
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      returning: true,
      plain: true,
    })
  } catch (error) {
    console.error(error)
  }
}

exports.removeTeam = async (tid) => {
  try {
    return await Team.destroy({
      where: {
        id: tid,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

exports.joinTeam = async (data) => {
  try {
    const player_team = new Player_team(data)
    return await player_team.save()
  } catch (error) {
    console.error(error)
  }
}

exports.saveMatchTeam = async (data) => {
  try {
    const match_team = new Match_team(data)
    return await match_team.save()
  } catch (error) {
    console.error(error)
  }
}

exports.leaveTeam = async (data) => {
  try {
    return await Player_team.destroy({
      where: {
        TeamId: data.TeamId,
        UserId: data.UserId,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
