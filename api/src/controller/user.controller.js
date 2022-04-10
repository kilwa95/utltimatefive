const {
  findAllUsers,
  findUserById,
  saveUser,
  updateUser,
  deleteUser,
} = require('../queries/user.queries')
const Helper = require('../Helper')

exports.getListUsers = async (req, res) => {
  try {
    const users = await findAllUsers()
    res.status(Helper.HTTP.OK).json({ data: users })
  } catch (error) {
    console.log(error)
    res.status(Helper.HTTP.SERVER_ERROR).send(error)
  }
}

exports.getUserById = async (req, res) => {
  try {
    const uid = parseInt(req.decoded.id)
    const user = await findUserById(uid)
    if (user) {
      res.status(Helper.HTTP.OK).json({
        data: user,
      })
    } else {
      res.status(Helper.HTTP.NOT_FOUND).send('User not found')
    }
  } catch (error) {
    console.log(error)
    res.status(Helper.HTTP.SERVER_ERROR).send(error)
  }
}

exports.createPlayer = async (req, res) => {
  const { firstName, lastName, email, password, birthday } = req.body
  if (Helper.isEmpty([firstName, lastName, email, password, birthday])) {
    res
      .status(Helper.HTTP.BAD_REQUEST)
      .send('firstName, lastName, email, password, birthday is required')
  }
  if (!Helper.validateEmail(email)) {
    res.status(Helper.HTTP.BAD_REQUEST).send('email is invalid')
  }
  if (!Helper.validateDate(birthday)) {
    res.status(Helper.HTTP.BAD_REQUEST).send('birthday is invalid')
  }
  if (!Helper.validatePassword(password)) {
    res.status(Helper.HTTP.BAD_REQUEST).send('password is invalid')
  }
  try {
    const user = await saveUser({
      firstName: Helper.sqlescstr(firstName),
      lastName: Helper.sqlescstr(lastName),
      email: Helper.sqlescstr(email),
      password: Helper.sqlescstr(password),
      birthday: Helper.sqlescstr(birthday),
      levelId: Helper.level.silverA,
      roles: ['player'],
    })
    if (user) {
      res.status(Helper.HTTP.OK).json({
        message: `User ${user.id} created`,
        data: user,
      })
    } else {
      res.status(Helper.HTTP.SERVER_ERROR).send('User not created')
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).send(error)
  }
}
exports.createOrganizer = async (req, res) => {
  const { firstName, lastName, email, password, birthday } = req.body
  if (Helper.isEmpty([firstName, lastName, email, password, birthday])) {
    res
      .status(Helper.HTTP.BAD_REQUEST)
      .send('firstName, lastName, email, password, birthday is required')
  }
  if (!Helper.validateEmail(email)) {
    res.status(Helper.HTTP.BAD_REQUEST).send('email is invalid')
  }
  if (!Helper.validateDate(birthday)) {
    res.status(Helper.HTTP.BAD_REQUEST).send('birthday is invalid')
  }
  if (!Helper.validatePassword(password)) {
    res.status(Helper.HTTP.BAD_REQUEST).send('password is invalid')
  }
  try {
    const user = await saveUser({
      firstName: Helper.sqlescstr(firstName),
      lastName: Helper.sqlescstr(lastName),
      email: Helper.sqlescstr(email),
      password: Helper.sqlescstr(password),
      birthday: Helper.sqlescstr(birthday),
      levelId: Helper.level.silverA,
      roles: ['organizer'],
    })
    if (user) {
      res.status(Helper.HTTP.OK).json({
        message: `User ${user.id} created`,
        data: user,
      })
    } else {
      res.status(Helper.HTTP.SERVER_ERROR).send('User not created')
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).send(error)
  }
}
exports.updatePlayer = async (req, res) => {
  const { firstName, lastName, email, password, birthday } = req.body

  if (Helper.isEmpty([req.params.uid])) {
    res.status(Helper.HTTP.BAD_REQUEST).send('uid is required')
  }
  if (!Helper.validateEmail(email)) {
    res.status(Helper.HTTP.BAD_REQUEST).send('email is invalid')
  }
  if (!Helper.validateDate(birthday)) {
    res.status(Helper.HTTP.BAD_REQUEST).send('birthday is invalid')
  }
  if (!Helper.validatePassword(password)) {
    res.status(Helper.HTTP.BAD_REQUEST).send('password is invalid')
  }
  try {
    const uid = parseInt(req.params.uid)
    const user = await updateUser(uid, {
      firstName: Helper.sqlescstr(firstName),
      lastName: Helper.sqlescstr(lastName),
      email: Helper.sqlescstr(email),
      password: Helper.sqlescstr(password),
      birthday: Helper.sqlescstr(birthday),
    })
    if (user) {
      res.status(Helper.HTTP.OK).json({
        message: `User ${uid} updated`,
        data: user,
      })
    } else {
      res.status(Helper.HTTP.BAD_REQUEST).send('User not Update')
    }
  } catch (error) {
    console.log(error)
    res.status(Helper.HTTP.SERVER_ERROR).send(error)
  }
}

exports.removeUser = async (req, res) => {
  if (Helper.isEmpty([req.params.uid])) {
    res.status(Helper.HTTP.BAD_REQUEST).send('uid is required')
  }
  try {
    const uid = parseInt(req.params.uid)
    const user = await deleteUser(uid)
    res.status(Helper.HTTP.OK).json({
      message: `User ${user} deleted`,
    })
  } catch (error) {
    console.log(error)
    res.status(Helper.HTTP.SERVER_ERROR).send(error)
  }
}

exports.disableUser = async (req, res) => {
  try {
    const uid = parseInt(req.params.uid)
    const user = await updateUser(uid, {
      enable: false,
    })
    res.status(Helper.HTTP.OK).json({
      message: `User ${user} disabled`,
    })
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).send(error)
  }
}
