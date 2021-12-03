const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {getListUsers,getUserById,createUser,updatePlayer,removeUser,disableUser} = require('./controller/user.controller');
const {login,logout,authJwt,isSelfUser,onlyAdmin,onlyPlayer,onlyCaptiner,onlyOrganizer,isSelfUserOrAdmin} = require('./controller/security.controller');
const {getListMatchs,getMatchById,createMatch,updateMatch,deleteMatch} = require('./controller/match.controller');
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
router.get('/users',getListUsers);
router.post('/users',createUser);
router.get('/users/:uid',getUserById);
router.put('/users/:uid',updatePlayer);
router.patch('/users/:uid/disable',disableUser);
router.delete('/users/:uid',removeUser);
/**
 * API Match
 */
router.get('/matchs',getListMatchs);
router.post('/matchs',createMatch);
router.get('/matchs/:mid',getMatchById);
router.put('/matchs/:mid',updateMatch);
router.delete('/matchs/:mid',deleteMatch);


module.exports = router;

