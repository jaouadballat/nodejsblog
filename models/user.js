var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		require: true
	},
	facebookid:{
		type:String
	},
	googleid: {
		type: String
	},
	twitterid: {
		type: String
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model('User', userSchema );