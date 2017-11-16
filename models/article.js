var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title: {
		type: String,
		require: true
	},
	body: {
		type: String, 
		require: true
	},
	content: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	}, 
	author: {
		type: String
	}
});

module.exports = mongoose.model('Article', articleSchema );