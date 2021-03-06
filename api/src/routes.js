const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const {
  getListUsers,
  getUserById,
  createPlayer,
  createOrganizer,
  createAdmin,
  updatePlayer,
  removeUser,
  disableUser,
  validatePlayer,
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
  onlyPlayerOrOrganizer,
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
  deletePlayerFromMatch,
  getAllMatchesPlayer,
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
  getListTeamsByPlayerId,
} = require('./controller/team.controller')
const {
  getListSports,
  getSportById,
  createSport,
  deleteSport,
  updateSport,
  isSportExist,
} = require('./controller/sport.controller')

const { upload, uploadFile } = require('./controller/upload.controller')

const router = express.Router()
router.use(express.json())

// Swagger UI
router.use('/api', swaggerUi.serve)
router.get('/api', swaggerUi.setup(swaggerDocument))
/**
 * API Auth
 */
router.post('/login', login)
router.post('/logout', logout)
/**
 * API users
 */
router.get('/users', getListUsers)
router.post('/players', createPlayer)

router.post('/admins', createAdmin)
router.put('/players/:uid', authJwt, isUserExist, isSelfUser, updatePlayer)
router.put('/users/:uid', authJwt, isUserExist, isSelfUser, updatePlayer)
router.post('/organizers', createOrganizer)
router.get('/users/info', authJwt, isUserExist, getUserById)
router.delete('/users/:uid', authJwt, isUserExist, removeUser) //isSelfUser
router.patch('/users/:uid/disable', authJwt, isUserExist, disableUser)
router.patch('/users/:uid/validated', authJwt, onlyOrganizer, validatePlayer)

/**
 * API Matchs
 */
router.get('/matchs', getListMatchs)
router.get('/matchs/:uid/organizer', authJwt, getListMatchsByUserId)
router.post('/matchs', authJwt, onlyOrganizer, createMatch)
router.get('/matchs/:mid', isMatchExist, getMatchById)
router.put('/matchs/:mid', authJwt, onlyOrganizer, isMatchExist, updateMatch)
router.delete('/matchs/:mid/players/:uid', authJwt, deletePlayerFromMatch)
router.get('/matchs/player/list', authJwt, getAllMatchesPlayer)
router.delete('/matchs/:mid', authJwt, onlyOrganizer, deleteMatch)
router.post(
  '/matchs/:mid/join',
  authJwt,
  onlyPlayerOrOrganizer,
  joinMatchPlayers,
)
/**
 * API levels
 */
router.get('/levels', getListLevels)
router.post('/admin/levels', authJwt, onlyAdmin, createLevel) //authJwt, onlyAdmin
router.post('/levels', createLevel) //authJwt, onlyAdmin
router.get('/levels/:lid', authJwt, isLevelExist, getLevelById)
router.put('/levels/:lid', authJwt, isLevelExist, onlyAdmin, updateLevel)
router.delete('/levels/:lid', authJwt, isLevelExist, onlyAdmin, deleteLevel)
/**
 * API teams
 */
router.get('/teams', getListTeams)
router.post('/admin/teams', authJwt, onlyAdmin, createTeam)
router.get('/teams/:tid', authJwt, onlyCaptiner, isTeamExist, getTeamById)
router.put('/teams/:tid', authJwt, isSelfCaptiner, updateTeam)
router.delete('/teams/:tid', authJwt, deleteTeam)
router.post('/teams/:tid/join', authJwt, onlyPlayerOrOrganizer, joinTeamMember)
router.delete('/teams/:tid/leave', authJwt, onlyPlayer, leaveTeamMember)
router.get('/teams/player/list', authJwt, getListTeamsByPlayerId)

/**
 * API sports
 */
router.get('/sports', authJwt, getListSports)
router.post('/sports', authJwt, onlyAdmin, createSport)
router.get('/sports/:sid', authJwt, onlyAdmin, isSportExist, getSportById)
router.put('/sports/:sid', authJwt, onlyAdmin, isSportExist, updateSport)
router.delete('/sports/:sid', authJwt, onlyAdmin, isSportExist, deleteSport)

module.exports = router
