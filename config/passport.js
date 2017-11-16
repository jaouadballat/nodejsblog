var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var passport = require('passport');

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	  function(username, password, done) {
	    User.findOne({ email: username }, function (err, user) {
	      if (err) {  
	      			return done(err); 
	      		}
	      if (!user) {
	        return done(null, false, { message: 'Incorrect username.' });
	      }
	     	bcrypt.compare(password, user.password, function(err, res) {
			    if(err) {
			    	return done(err);
			    	console.log(err)
			    }
			    if(res){
	      			return done(null, user);
			    }else{
			    	return done(null, false, { message: 'Incorrect password.' });
			    }
			});

	    });
	  }
	));
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
module.exports = passport;