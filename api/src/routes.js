const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {getListUsers,getUserById,createUser,updatePlayer,removeUser} = require('./controller/user.controller');
const {login,logout,authJwt,isSelfUser,onlyAdmin,onlyPlayer,onlyCaptiner,onlyOrganizer} = require('./controller/security.controller');

const router = express.Router();
router.use(express.json());

// Swagger UI
router.use('/api', swaggerUi.serve);
router.get('/api', swaggerUi.setup(swaggerDocument));

/**
 * API users
 */
router.get('/users',authJwt,getListUsers);
router.get('/users/:uid',getUserById);
router.post('/users',createUser);
router.put('/users/:uid',authJwt,isSelfUser,updatePlayer);
router.delete('/users/:uid',authJwt,isSelfUser,removeUser);

/**
 * API Auth
 */
router.post('/login',login);
router.post('/logout',logout);


module.exports = router;

