const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');

const router = Router();

router.get('/v1/category/search', categoryController.search);
router.get('/v1/category/:id', categoryController.getById);

// Rotas protegidas por JWT (POST, PUT, DELETE)
router.post('/v1/category', authMiddleware, categoryController.create);
router.put('/v1/category/:id', authMiddleware, categoryController.update);
router.delete('/v1/category/:id', authMiddleware, categoryController.remove);

module.exports = router;