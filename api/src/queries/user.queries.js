const User = require('../models/sequelize/User')
const Level = require('../models/sequelize/Level')
const Address = require('../models/sequelize/Address')
const Team = require('../models/sequelize/Team')
const Match = require('../models/sequelize/Match')

exports.saveUser = async (data) => {
  try {
    const user = new User(data)
    return await user.save()
  } catch (error) {
    console.error(error.message)
  }
}

exports.findAllUsers = async () => {
  try {
    return await User.findAll({
      include: [
        {
          model: Level,
          as: 'level',
          attributes: ['name'],
        },
        { model: Address, as: 'address' },
      ],
    })
  } catch (error) {
    console.error(error)
  }
}
exports.findAllUsersWaiting = async () => {
  try {
    return await User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'enable',
        'roles',
        'birthday',
        'status',
        'image',
      ],
      where: {
        status: 'waiting',
      },
      include: [
        {
          model: Level,
          as: 'level',
          attributes: ['name'],
        },
        { model: Address, as: 'address' },
      ],
    })
  } catch (error) {
    console.error(error)
  }
}

exports.findUserById = async (uid) => {
  try {
    return await User.findOne({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'password',
        'email',
        'enable',
        'roles',
        'birthday',
        'status',
        'image',
      ],
      include: [
        {
          model: Level,
          as: 'level',
          attributes: ['name'],
        },
        { model: Address, as: 'address' },
      ],
      where: {
        id: uid,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

exports.findUserByEmail = async (email) => {
  try {
    return await User.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: Team,
          as: 'equibes',
          through: { atttributes: [] },
        },
      ],
    })
  } catch (error) {
    console.error(error)
  }
}

exports.updateUser = async (uid, data) => {
  try {
    const ressource = await User.update(data, {
      where: {
        id: uid,
      },
      returning: true,
      plain: true,
    })
    return ressource[1]
  } catch (error) {
    console.error(error)
  }
}

exports.deleteUser = async (uid) => {
  try {
    return await User.destroy({
      where: {
        id: uid,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

exports.updatePlayerStatus = async (uid, status) => {
  try {
    const ressource = await User.update(
      {
        status: status,
      },
      {
        where: {
          id: uid,
        },
        returning: true,
        plain: true,
      },
    )
    return ressource[1]
  } catch (error) {
    console.error(error)
  }
}
