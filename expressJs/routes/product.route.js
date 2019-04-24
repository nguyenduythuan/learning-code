const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
var middleware = require('../middlewares/auth.middleware');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

router.get('/', controller.index);
router.get('/add', middleware.getCookie, controller.get);
router.post('/add', upload.single('image'), controller.postCreat);
router.get('/search', controller.search);

module.exports = router;