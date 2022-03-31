const { findUserByEmail, findUserById } = require('../queries/user.queries')
const { findAllMatchesByUserId } = require('../queries/match.queries')
const { findAllTeamsByUserId } = require('../queries/team.queries')
const Helper = require('../Helper')
const Security = require('../services/security')

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (Helper.isEmpty([email, password])) {
    return res.status(Helper.HTTP.BAD_REQUEST).json({
      message: 'Please provide email and password',
    })
  }
  if (!Helper.validateEmail(email)) {
    return res.status(Helper.HTTP.BAD_REQUEST).json({
      message: 'Invalid email',
    })
  }
  if (!Helper.validatePassword(password)) {
    return res.status(Helper.HTTP.BAD_REQUEST).json({
      message: 'Invalid password',
    })
  }
  try {
    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(Helper.HTTP.NOT_FOUND).json({
        message: 'User not found',
      })
    }
    const isPasswordOk = Security.checkPassword(password, user.password)
    if (!isPasswordOk) {
      return res.status(Helper.HTTP.BAD_REQUEST).json({
        message: 'Invalid password',
      })
    }
    const decoded = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isPlayer: user.roles.includes('player'),
      isAdmin: user.roles.includes('admin'),
      isOrganizer: user.roles.includes('organizer'),
      isCaptiner: user.roles.includes('captain'),
    }
    const token = Security.generateToken(decoded)
    res.header('Authorization', `Bearer ${token}`)

    return res.status(Helper.HTTP.CREATED).json({
      message: 'Login successful',
      token,
      user: decoded,
    })
  } catch (error) {
    console.error(error)
    return res.status(Helper.HTTP.SERVER_ERROR).json({
      message: 'Internal server error',
    })
  }
}

exports.logout = (req, res) => {
  try {
    res.clearCookie('token')
    req.decoded = null
    return res.status(Helper.HTTP.OK).json({
      message: 'Logout successful',
    })
  } catch (error) {
    console.error(error)
    return res.status(Helper.HTTP.SERVER_ERROR).json({
      message: 'Internal server error',
    })
  }
}

exports.authJwt = (req, res, next) => {
  try {
    const token = Security.getTokenFromRequest(req)
    const decoded = Security.getDecodedFromToken(token)
    if (!token || !decoded) {
      return res
        .status(Helper.HTTP.UNAUTHORIZED)
        .json({ error: 'jwt token required' })
    }
    req.decoded = decoded
    return next()
  } catch (error) {
    return res.status(Helper.HTTP.SERVER_ERROR).json({ error })
  }
}

exports.onlyAdmin = (req, res, next) => {
  try {
    if (req.decoded && req.decoded.isAdmin) {
      return next()
    }
    return res
      .status(Helper.HTTP.UNAUTHORIZED)
      .json({ error: 'only Admin can access this route' })
  } catch (error) {
    return res.status(Helper.HTTP.SERVER_ERROR).json({ error })
  }
}
exports.onlyPlayer = (req, res, next) => {
  try {
    if (req.decoded && req.decoded.isPlayer) {
      return next()
    }
    return res
      .status(Helper.HTTP.UNAUTHORIZED)
      .json({ error: 'only Player can access this route' })
  } catch (error) {
    return res.status(Helper.HTTP.SERVER_ERROR).json({ error })
  }
}
exports.onlyOrganizer = (req, res, next) => {
  try {
    if (req.decoded && req.decoded.isOrganizer) {
      return next()
    }
    return res
      .status(Helper.HTTP.UNAUTHORIZED)
      .json({ error: 'only Organizer can access this route' })
  } catch (error) {
    return res.status(Helper.HTTP.SERVER_ERROR).json({ error })
  }
}
exports.onlyCaptiner = (req, res, next) => {
  try {
    if (req.decoded && req.decoded.isCaptiner) {
      return next()
    }
    return res
      .status(Helper.HTTP.UNAUTHORIZED)
      .json({ error: 'only Captiner can access this route' })
  } catch (error) {
    return res.status(Helper.HTTP.SERVER_ERROR).json({ error })
  }
}
exports.isSelfUser = (req, res, next) => {
  try {
    const uid = req.params.uid || req.body.uid || req.query.uid
    if (req.decoded && req.decoded.id == uid) {
      return next()
    }
    return res
      .status(Helper.HTTP.UNAUTHORIZED)
      .json({ error: 'only user self can edit or delete this ressource' })
  } catch (error) {
    return res.status(Helper.HTTP.SERVER_ERROR).json({ error })
  }
}

exports.isSelfOrganizer = async (req, res, next) => {
  try {
    const uid = req.decoded.id
    const matches = await findAllMatchesByUserId(uid)
    const matchesJson = matches.map((match) => match.toJSON())
    const organizerIds = matchesJson.map((match) => match.organizerId)
    if (req.decoded && organizerIds.includes(uid)) {
      return next()
    }
    return res
      .status(Helper.HTTP.UNAUTHORIZED)
      .json({ error: 'only organizer self can edit or delete this ressource' })
  } catch (error) {
    console.error(error)
    return res.status(Helper.HTTP.SERVER_ERROR).json({ error })
  }
}

exports.isSelfCaptiner = async (req, res, next) => {
  try {
    const uid = req.decoded.id
    console.log('uid', uid)
    const teams = await findAllTeamsByUserId(uid)
    const teamsJson = teams.map((team) => team.toJSON())
    const captinersIds = teamsJson.map((team) => team.captineId)
    if (req.decoded && captinersIds.includes(uid)) {
      return next()
    }
    return res
      .status(Helper.HTTP.UNAUTHORIZED)
      .json({ error: 'only captiner self can edit or delete this ressource' })
  } catch (error) {
    console.error(error)
    return res.status(Helper.HTTP.SERVER_ERROR).json({ error })
  }
}

exports.isSelfUserOrAdmin = (req, res, next) => {
  try {
    const uid = req.params.uid || req.body.uid || req.query.uid
    if (req.decoded && (req.decoded.id === uid || req.decoded.isAdmin)) {
      return next()
    }
    return res.status(Helper.HTTP.UNAUTHORIZED).json({
      error: 'only user self or Admin can edit or delete this ressource',
    })
  } catch (error) {
    return res.status(Helper.HTTP.SERVER_ERROR).json({ error })
  }
}

exports.isUserExist = async (req, res, next) => {
  try {
    const uid = req.params.uid || req.body.uid || req.query.uid
    if (Helper.isEmpty([uid])) {
      res.status(Helper.HTTP.BAD_REQUEST).send('uid is required')
    }
    const user = await findUserById(uid)
    if (user) {
      return next()
    } else {
      return res.status(Helper.HTTP.NOT_FOUND).json({
        error: 'User not found',
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(Helper.HTTP.SERVER_ERROR).json({
      message: 'Internal server error',
    })
  }
}
