const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {getListUsers,getUserById,createUser,updatePlayer,removeUser,disableUser} = require('./controller/user.controller');
const {login,logout,authJwt,isSelfUser,onlyAdmin,onlyPlayer,onlyCaptiner,onlyOrganizer,isSelfOrganizer,isUserExist} = require('./controller/security.controller');
const {getListMatchs,getMatchById,createMatch,updateMatch,deleteMatch,isMatchExist} = require('./controller/match.controller');
const {getListLevels,getLevelById,createLevel,updateLevel,deleteLevel} = require('./controller/level.controller');
const {getListTeams,getTeamById,createTeam,updateTeam,deleteTeam} = require('./controller/team.controller');
const {getListSports,getSportById,createSport,deleteSport,updateSport} = require('./controller/sport.controller');
const router = express.Router();
router.use(express.json());

// Swagger UI
router.use('/api', swaggerUi.serve);
router.get('/api', swaggerUi.setup(swaggerDocument));
/**
 * API Auth
 */
router.post('/login',login);
router.post('/logout',logout);
/**
 * API users
 */
router.get('/users',authJwt,onlyAdmin,getListUsers);
router.post('/users',createUser);
router.get('/users/:uid',authJwt,isUserExist,getUserById);
router.put('/users/:uid',authJwt,isUserExist,isSelfUser,updatePlayer);
router.delete('/users/:uid',authJwt,isUserExist,isSelfUser,removeUser);
router.patch('/users/:uid/disable',authJwt,isUserExist,disableUser);
/**
 * API Match
 */
router.get('/matchs',authJwt,getListMatchs);
router.post('/matchs',authJwt,onlyOrganizer,createMatch);
router.get('/matchs/:mid',authJwt,isMatchExist,getMatchById);
router.put('/matchs/:mid',authJwt,onlyOrganizer,isMatchExist,isSelfOrganizer,updateMatch);
router.delete('/matchs/:mid',authJwt,onlyOrganizer,isMatchExist,isSelfOrganizer,deleteMatch);
/**
 * API levels
 */
router.get('/levels',getListLevels);
router.post('/levels',createLevel);
router.get('/levels/:lid',getLevelById);
router.put('/levels/:lid',updateLevel);
router.delete('/levels/:lid',deleteLevel);
/**
 * API teams
 */
router.get('/teams',getListTeams);
router.post('/teams',createTeam);
router.get('/teams/:tid',getTeamById);
router.put('/teams/:tid',updateTeam);
router.delete('/teams/:tid',deleteTeam);
/**
 * API sports
 */
router.get('/sports',getListSports);
router.post('/sports',createSport);
router.get('/sports/:sid',getSportById);
router.put('/sports/:sid',updateSport);
router.delete('/sports/:sid',deleteSport);



module.exports = router;

