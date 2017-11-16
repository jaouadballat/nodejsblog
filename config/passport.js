var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var keys = require('./key');

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

	// google auth
		passport.use(new GoogleStrategy({
	    clientID: keys.google.clientId,
	    clientSecret: keys.google.clientSecret,
	    callbackURL: "http://localhost:3000/users/auth/google/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	      User.findOne({googleid: profile.id}, function(err, user){
	      	if(user) {
	      		return done(null, user);
	      	}else{
	      		new User({
	      			googleid: profile.id,
	      			username: profile.displayName
	      		}).save(function(err, user){
	      			if(err){
	      				console.log(err)
	      			}else{
	      				return done(null, user);
	      			}
	      		})
	      	}
	      })
	  }
	));
	// end

	// facebook login
		passport.use(new FacebookStrategy({
	    clientID: keys.facebook.clientId,
	    clientSecret: keys.facebook.clientSecret,
	    callbackURL: "http://localhost:3000/users/auth/facebook/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	      User.findOne({facebookid: profile.id}, function(err, user){
	      	if(user) {
	      		return done(null, user);
	      	}else{
	      		new User({
	      			facebookid: profile.id,
	      			username: profile.displayName
	      		}).save(function(err, user){
	      			if(err){
	      				console.log(err)
	      			}else{
	      				return done(null, user);
	      			}
	      		})
	      	}
	      })
	  }
	));

	//end
	 // twitter login
	 	passport.use(new TwitterStrategy({
	    consumerKey: keys.twitter.clientId,
	    consumerSecret: keys.twitter.clientSecret,
	    callbackURL: "http://localhost:3000/users/auth/twitter/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	      User.findOne({twitterid: profile.id}, function(err, user){
	      console.log(profile)
	      	if(user) {
	      		return done(null, user);
	      	}else{
	      		new User({
	      			twitterid: profile.id,
	      			username: profile.displayName
	      		}).save(function(err, user){
	      			if(err){
	      				console.log(err)
	      			}else{
	      				return done(null, user);
	      			}
	      		})
	      	}
	      })
	  }
	));
	 // end


	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
module.exports = passport;