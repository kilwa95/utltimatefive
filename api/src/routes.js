const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const {
  getListUsers,
  getUserById,
  createPlayer,
  createOrganizer,
  updatePlayer,
  removeUser,
  disableUser,
} = require('./controller/user.controller')
const {
  login,
  logout,
  authJwt,
  isSelfUser,
  onlyAdmin,
  onlyCaptiner,
  onlyOrganizer,
  onlyPlayer,
  isSelfOrganizer,
  isSelfCaptiner,
  isUserExist,
} = require('./controller/security.controller')
const {
  getListMatchs,
  getMatchById,
  getListMatchsByUserId,
  createMatch,
  updateMatch,
  deleteMatch,
  isMatchExist,
  joinMatchPlayers,
} = require('./controller/match.controller')
const {
  getListLevels,
  getLevelById,
  createLevel,
  updateLevel,
  deleteLevel,
  isLevelExist,
} = require('./controller/level.controller')
const {
  getListTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  isTeamExist,
  joinTeamMember,
  leaveTeamMember,
} = require('./controller/team.controller')
const {
  getListSports,
  getSportById,
  createSport,
  deleteSport,
  updateSport,
  isSportExist,
} = require('./controller/sport.controller')

const router = express.Router()
router.use(express.json())

// Swagger UI
router.use('/api', swaggerUi.serve)
router.get('/api', swaggerUi.setup(swaggerDocument))
/**s
 * API Auth
 */
router.post('/login', login)
router.post('/logout', logout)
/**
 * API users
 */
router.get('/users', getListUsers)
router.post('/players', createPlayer)
router.put('/players/:uid', authJwt, isUserExist, isSelfUser, updatePlayer)
router.post('/organizers', createOrganizer)
router.get('/users/info', authJwt, isUserExist, getUserById)
router.delete('/users/:uid', authJwt, isUserExist, removeUser) //isSelfUser
router.patch('/users/:uid/disable', authJwt, isUserExist, disableUser)
/**
 * API Match
 */
router.get('/matchs', getListMatchs)
router.get('/matchs/:uid/organizer', authJwt, getListMatchsByUserId)
router.post('/matchs', authJwt, onlyOrganizer, createMatch)
router.get('/matchs/:mid', isMatchExist, getMatchById)
router.put(
  '/matchs/:mid',
  authJwt,
  onlyOrganizer,
  isMatchExist,
  isSelfOrganizer,
  updateMatch,
)
router.delete(
  '/matchs/:mid',
  authJwt,
  onlyOrganizer,
  isMatchExist,
  isSelfOrganizer,
  deleteMatch,
)
router.post(
  '/matchs/:mid/join',
  authJwt,
  onlyPlayer,
  isMatchExist,
  joinMatchPlayers,
)
/**
 * API levels
 */
router.get('/levels', getListLevels)
router.post('/levels', createLevel) //authJwt, onlyAdmin
router.get('/levels/:lid', authJwt, isLevelExist, getLevelById)
router.put('/levels/:lid', authJwt, isLevelExist, onlyAdmin, updateLevel)
router.delete('/levels/:lid', authJwt, isLevelExist, onlyAdmin, deleteLevel)
/**
 * API teams
 */
router.get('/teams', authJwt, getListTeams)
router.post('/teams', authJwt, onlyCaptiner, createTeam)
router.get('/teams/:tid', authJwt, onlyCaptiner, isTeamExist, getTeamById)
router.put(
  '/teams/:tid',
  authJwt,
  onlyCaptiner,
  isTeamExist,
  isSelfCaptiner,
  updateTeam,
)
router.delete(
  '/teams/:tid',
  authJwt,
  onlyCaptiner,
  isTeamExist,
  isSelfCaptiner,
  deleteTeam,
)
router.post(
  '/teams/:tid/join',
  authJwt,
  onlyPlayer,
  isTeamExist,
  joinTeamMember,
)
router.delete(
  '/teams/:tid/left',
  authJwt,
  onlyPlayer,
  isTeamExist,
  leaveTeamMember,
)

/**
 * API sports
 */
router.get('/sports', authJwt, getListSports)
router.post('/sports', authJwt, onlyAdmin, createSport)
router.get('/sports/:sid', authJwt, onlyAdmin, isSportExist, getSportById)
router.put('/sports/:sid', authJwt, onlyAdmin, isSportExist, updateSport)
router.delete('/sports/:sid', authJwt, onlyAdmin, isSportExist, deleteSport)

module.exports = router
