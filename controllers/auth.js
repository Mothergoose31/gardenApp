const express = require('express');
const db = require('../models');
const router = express.Router();
const passport = require('../config/passportConfig');

//Get Auth/signup - sends the signup form
router.get('/signup', function(req, res) {
  res.render('auth/signup');
});
//Get Auth/Signup - recieves the data from the form above
router.post('/signup',function(req,res){
  db.user.findOrCreate({
    where:{email: req.body.email},
    defaults:{
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user,created){
    if (created){
      console.log('user was created ,not found');
      passport.authenticate('local',{
        successRedirect:'/',
        successFlash:'Account created and logged in!'
      })(req,res);
      //IIFE imediately invoked funtion expression
      
    }else{
      console.log('email already exists');
      req.flash('error','Email already exists!😆')
      res.redirect('/auth/signup');
    }
  }).catch(function(error){
    console.log('Error:',error.message);
    req.flash('error',error.message);
    res.redirect('/auth/signup');
  })
})

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login' ,passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/auth/login',
  successFlash:'You have looged in! 👌',
  failureFlash:'Invalid username and/or password😩'
}));


router.get('/logout', function(req, res) {
  req.logout();
  console.log('logged out');
  req.flash('success', "you have logged out ?");
  res.redirect('/');
});


module.exports = router;
