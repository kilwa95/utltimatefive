const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {getListUsers,getUserById,createUser,updatePlayer,removeUser,disableUser} = require('./controller/user.controller');
const {login,logout,authJwt,isSelfUser,onlyAdmin,onlyCaptiner,onlyOrganizer,onlyPlayer,isSelfOrganizer,isSelfCaptiner,isUserExist} = require('./controller/security.controller');
const {getListMatchs,getMatchById,createMatch,updateMatch,deleteMatch,isMatchExist,joinMatchPlayers} = require('./controller/match.controller');
const {getListLevels,getLevelById,createLevel,updateLevel,deleteLevel,isLevelExist} = require('./controller/level.controller');
const {getListTeams,getTeamById,createTeam,updateTeam,deleteTeam,isTeamExist,joinTeamMember,leaveTeamMember} = require('./controller/team.controller');
const {getListSports,getSportById,createSport,deleteSport,updateSport,isSportExist} = require('./controller/sport.controller');
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
router.get('/users',getListUsers);// authJwt,onlyAdmin
router.post('/users',createUser);
router.get('/users/:uid',authJwt,isUserExist,getUserById);
router.put('/users/:uid',authJwt,isUserExist,isSelfUser,updatePlayer);
router.delete('/users/:uid',authJwt,isUserExist,isSelfUser,removeUser);
router.patch('/users/:uid/disable',authJwt,isUserExist,disableUser);
/**
 * API Match
 */
router.get('/matchs',getListMatchs); //authJwt
router.post('/matchs',authJwt,onlyOrganizer,createMatch);
router.get('/matchs/:mid',authJwt,isMatchExist,getMatchById);
router.put('/matchs/:mid',authJwt,onlyOrganizer,isMatchExist,isSelfOrganizer,updateMatch);
router.delete('/matchs/:mid',authJwt,onlyOrganizer,isMatchExist,isSelfOrganizer,deleteMatch);
router.post('/matchs/:mid/join',authJwt,onlyPlayer,isMatchExist,joinMatchPlayers);
/**
 * API levels
 */
router.get('/levels',getListLevels); //authJwt
router.post('/levels',createLevel); //authJwt,onlyAdmin
router.get('/levels/:lid',authJwt,isLevelExist,getLevelById);
router.put('/levels/:lid',authJwt,isLevelExist,onlyAdmin,updateLevel);
router.delete('/levels/:lid',authJwt,isLevelExist,onlyAdmin,deleteLevel);
/**
 * API teams
 */
router.get('/teams',authJwt,getListTeams);
router.post('/teams',authJwt,onlyCaptiner,createTeam);
router.get('/teams/:tid',authJwt,onlyCaptiner,isTeamExist,getTeamById);
router.put('/teams/:tid',authJwt,onlyCaptiner,isTeamExist,isSelfCaptiner,updateTeam);
router.delete('/teams/:tid',authJwt,onlyCaptiner,isTeamExist,isSelfCaptiner,deleteTeam);
router.post('/teams/:tid/join',authJwt,onlyPlayer,isTeamExist,joinTeamMember);
router.delete('/teams/:tid/left',authJwt,onlyPlayer,isTeamExist,leaveTeamMember);

/**
 * API sports
 */
router.get('/sports',authJwt,getListSports);
router.post('/sports',authJwt,onlyAdmin,createSport);
router.get('/sports/:sid',authJwt,onlyAdmin,isSportExist,getSportById);
router.put('/sports/:sid',authJwt,onlyAdmin,isSportExist,updateSport);
router.delete('/sports/:sid',authJwt,onlyAdmin,isSportExist,deleteSport);



module.exports = router;

