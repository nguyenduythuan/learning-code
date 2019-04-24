var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var multer  = require('multer');
var upload = multer({ dest: './public/avartars/' });

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', upload.single('avatar'), 
	validate.postCreate, controller.postCreate);

router.get('/edit/:id',controller.getEdit);

router.post('/edit/:id', upload.single('avatar'), controller.postEdit);

router.get('/delete/:id', controller.getDelete);

module.exports = router;