const { Router } = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

const router = Router();

router.get('/v1/product/search', productController.search);
router.get('/v1/product/:id', productController.getById);

// Rotas protegidas por JWT (POST, PUT, DELETE)
router.post('/v1/product', authMiddleware, productController.create);
router.put('/v1/product/:id', authMiddleware, productController.update);
router.delete('/v1/product/:id', authMiddleware, productController.remove);

module.exports = router;