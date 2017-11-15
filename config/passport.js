const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
	passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  	},
	  function(email, password, done) {
	    User.findOne({ email: email }, function(err, user) {
	      if (err) { return done(err); }
	      if (!user) {
	        return done(null, false, { message: 'Incorrect email.' });
	      }
	      bcrypt.compare(password, user.password, function(err, res) {
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
}