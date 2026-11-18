const { Router } = require('express');
const authController = require('../controllers/authController');


const router = Router();

router.post('/v1/auth', authController.authenticate);

module.exports = router;