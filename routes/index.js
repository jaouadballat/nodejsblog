var express = require('express');
var router = express.Router();
var Article = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find({}, function(err, articles){
  	if(err){
  		console.log(err)
  	}else{
  		res.render('index', {
  			articles: articles
  		});
  	}
  })
});

router.get('/about', function(req, res, next) {
  res.render('about');
});


module.exports = router;
