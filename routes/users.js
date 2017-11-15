var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
const passport = require('passport');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('password', 'password is required').notEmpty();
	req.checkBody('confirm_password', 'password is not match').equals(req.body.password);
	var errors = req.validationErrors();
  	if(errors) {
  		res.render('register', {
  			errors: errors
  		})
  	}else{
  		var user = new User();
  		user.username = req.body.username;
  		user.email = req.body.email;
  		var password = req.body.password;
  		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(password, salt, function(err, hash) {
		        user.password = hash;
		        user.save(function(err, user){
  					res.redirect('/')
		        });
		    });
		});
  	}
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/users/login',
                                   failureFlash: true })
);


module.exports = router;
