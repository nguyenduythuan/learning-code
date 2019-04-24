require('dotenv').config();
var express   = require('express');
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');
 mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

var bodyParser= require('body-parser');

var authRoute   = require('./routes/auth.route');
var userRoute   = require('./routes/users.route');
var productRoute   = require('./routes/product.route');
var cartRoute   = require('./routes/cart.route');

var middleware = require('./middlewares/auth.middleware');
var middlewareSession = require('./middlewares/session.middleware');

var app       = express();
var port      = 3000;

app.use(cookieParser(process.env.SECSSION_SECRET));

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(middlewareSession);
app.use(middlewareSession.getNumberCar);

app.get('/', middleware.getAuth, function(req, res){
	res.render('home');
});

app.use('/auth', authRoute);
app.use('/users',  middleware.getCookie, userRoute);
app.use('/products', middleware.getAuth, productRoute);
app.use('/cart', middleware.getAuth, cartRoute);

app.listen(port, function(){
	console.log('Sever listening on port ' + port);
});
