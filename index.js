require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios');
//configure express-session middleware
const app = express();
const session = require('express-session');
const passport = require('./config/passportConfig')
const flash = require('connect-flash');
app.set('view engine', 'ejs');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const db = require('./models');


// Delete  or update a vetable 
const methodOveride = require('method-override');
//THIS IS ONLY USED BY THE SESSION STORE

//This libe makes the session use sequelize to write session data to a postgres table

const sequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new sequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 *30
})

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());
//Configures  express-session middleware 
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true,
  store:sessionStore
}));

// this runs once and only once
sessionStore.sync();


//this start the flash middleware
app.use(flash());
//LINK PASSPORT TO THE EXPRESS SESSION
//MUST BE BELOW SESSION
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res, next){
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})



app.get('/', function(req, res) {
  

  res.render('index');
});

app.get('/profile',isLoggedIn, function(req, res) {
  res.render('profile');
});

app.get('/vegetable/',isLoggedIn,function(req,res){
  let vegetable = req.query.veggieInput;
  let openFarmsUrl = 'https://openfarm.cc/api/v1/crops/?filter=';
  axios.get(openFarmsUrl+vegetable).then(function(result){
    console.log (result.data.data[0])
    res.render('vegetable',{vegetable:result.data.data[0]})
  })


});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
