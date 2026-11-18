const { Router } = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = Router();

router.get('/v1/user/:id', userController.getById);
router.post('/v1/user', userController.create);

// Rotas protegidas por JWT
router.put('/v1/user/:id', authMiddleware, userController.update);
router.delete('/v1/user/:id', authMiddleware, userController.remove);

module.exports = router;