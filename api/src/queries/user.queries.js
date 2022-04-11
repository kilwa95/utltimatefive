const User = require('../models/sequelize/User')
const Level = require('../models/sequelize/Level')
const Address = require('../models/sequelize/Address')

exports.saveUser = async (data) => {
  try {
    const user = new User(data)
    return await user.save()
  } catch (error) {
    console.error(error)
  }
}

exports.findAllUsers = async () => {
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
      ],
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
