var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var User = require('../models/user');
var auth  = require('../config/auth');

/* GET home page. */
router.get('/add',auth, function(req, res, next) {

  res.render('add_article');
});

router.post('/add',auth, function(req, res, next) {
  req.checkBody('title', 'Title is require').notEmpty();
  req.checkBody('content', 'Content is require').notEmpty();
  var errors = req.validationErrors();
  if(errors){
  	res.render('add_article', {
  		errors: errors
  	});
  }else{
  	var article = new Article();
  	article.title = req.body.title;
    article.content = req.body.content;
  	article.author = req.user._id;
  	article.save(function(err, article){
  		if(err){
  			console.log(err)
  		}else{
  			
  			res.render('add_article');
  		}
  	})
  }
});

router.get('/edit/:id',auth, function(req, res, next){
	Article.findById(req.params.id, function(err, article){
		res.render("edit", {
			article: article
		})
	});
});

router.post('/update/:id',auth, function(req, res, next){
		Article.findByIdAndUpdate(req.params.id,
		{$set: {title: req.body.title, content: req.body.content}},
		 function(err, article){
		 	req.session.sessionFlash = {
		        type: 'success',
		        message: 'This is a flash message using custom middleware and express-session.'
		    }
			res.redirect('/')		
	});
});

router.post('/delete/:id',auth, function(req, res){
	Article.findByIdAndRemove(req.params.id, function(err, article){
		res.redirect('/');
	})
})

module.exports = router;
