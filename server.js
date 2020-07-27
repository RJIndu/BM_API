const express = require('express');
const logger = require('morgan');
const compression = require('compression');
const path = require('path');
const movies = require('./routes/movies') ;
const products = require('./routes/products') ;
const categories = require('./routes/categories') ;
const users = require('./routes/users');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token
mongoose.set('debug', true);



// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'ERROR: MongoDB connection error:'));

app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', function(req, res){
res.json({"tutorial" : "Build REST API with node.js"});
});

// public route
app.use('/users', users);

// private route
// app.use('/movies', validateUser, movies);
//app.use('/products', validateUser, products);

app.use('/products', products);
app.use('/categories', categories);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}


// // express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// // handle 404 error
// app.use(function(req, res, next) {
// 	let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // var err = new Error('Not Found');
    // err.status = 404;
    // next(err);
    res.render('index');
});

// handle errors
app.use(function(err, req, res, next) {
    console.log("ERROR OCCURRED HERE"+err);
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({
        message: err.message,
        status: err.status
    });
   
});

// app.use(function(err, req, res, next) {
// 	console.log(err);
	
//   if(err.status === 404)
//   	res.status(404).json({message: "Not found"});
//   else	
//     res.status(500).json({message: "Something looks wrong :( !!!"});

// });

app.listen(4000, function(){
	console.log('Node server listening on port 4000');
});
