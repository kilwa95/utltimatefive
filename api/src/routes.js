const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const router = express.Router();
router.use(express.json());

// Swagger UI
router.use('/api', swaggerUi.serve);
router.get('/api', swaggerUi.setup(swaggerDocument));

//users
module.exports = router;

