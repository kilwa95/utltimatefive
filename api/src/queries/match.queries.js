const Match = require('../models/sequelize/Match')
const User = require('../models/sequelize/User')
const Level = require('../models/sequelize/Level')
const Player_match = require('../models/sequelize/Player_match')

exports.saveMatch = async (data) => {
  try {
    const match = new Match(data)
    return await match.save()
  } catch (error) {
    console.error(error)
  }
}
exports.findAllMatches = async () => {
  try {
    return await Match.findAll({
      attributes: [
        'id',
        'salle',
        'status',
        'ville',
        'address',
        'image',
        'slots',
        'square',
        'price',
      ],
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
        {
          model: Level,
          as: 'level',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'players',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    })
  } catch (error) {
    console.error(error)
  }
}
exports.findAllMatchesByUserId = async (uid) => {
  try {
    return await Match.findAll({
      attributes: [
        'id',
        'salle',
        'status',
        'ville',
        'address',
        'image',
        'slots',
        'square',
        'price',
      ],
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
        {
          model: Level,
          as: 'level',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'players',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
      where: {
        organizerId: uid,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

exports.findMatchById = async (matchId) => {
  try {
    return await Match.findByPk(matchId, {
      attributes: ['id', 'name', 'status'],
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    })
  } catch (error) {
    console.error(error)
  }
}
exports.findMatchByLevelId = async (levelId) => {
  try {
    return await Match.findAll({
      where: {
        levelId: levelId,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

exports.findMatchByUserId = async (matchId) => {
  try {
    return await Match.findAll({
      where: {
        userId: matchId,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
exports.findMatchByUserIdAndMatchId = async (userId, matchId) => {
  try {
    return await Match.findOne({
      where: {
        userId: userId,
        id: matchId,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
exports.updateMatch = async (matchId, data) => {
  try {
    const match = await Match.update(data, {
      where: {
        id: matchId,
      },
      returning: true,
      plain: true,
    })
    return match[1]
  } catch (error) {
    console.error(error)
  }
}
exports.deleteMatch = async (matchId) => {
  try {
    return await Match.destroy({
      where: {
        id: matchId,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

exports.joinMatch = async (data) => {
  try {
    const player_match = new Player_match(data)
    return await player_match.save()
  } catch (error) {
    console.error(error)
  }
}
