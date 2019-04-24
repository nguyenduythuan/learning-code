const express   = require('express');
const router    = express.Router();
const controller= require('../controllers/cart.controller');

router.get('/add/:productId', controller.addToCart);
router.get('/', controller.getProductCart);

module.exports = router;