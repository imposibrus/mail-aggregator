var express = require('express'),
    router = express.Router(),
    models = require('../models'),
    preventUnAuthUser = require('../lib/preventUnAuthUser'),
    getUserBySession = require('../lib/getUserBySession');


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('user/login');
});

router.post('/login', function(req, res) {
  models.User.findOne({email: req.body.email, password: req.body.password})
      .exec(function(err, foundUser) {
        if(err) {
          console.log(err);
          return res.send({status: 500, err: err});
        }
        if(!foundUser) {
          return res.send({status: 400, desc: 'no such user'});
        }
        console.log(foundUser);
        req.session.user = {
          id: foundUser.id,
          name: foundUser.name
        };
        res.redirect('/user/account');
      });
});

router.get('/registration', function(req, res) {
  res.render('user/registration');
});

router.post('/registration', function(req, res) {
  new models.User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).save(function(err, savedUser) {
        if(err) {
          console.log(err);
          return res.send({status: 500, err: err});
        }
        req.session.user = {
          id: savedUser.id,
          name: savedUser.name
        };
        if(req.xhr) {
          res.send({status: 200});
        } else {
          res.redirect('/user/account');
        }
      });
});

router.get('/account', preventUnAuthUser, getUserBySession, function(req, res) {
  res.render('user/account');
});

router.post('/add_mail', preventUnAuthUser, getUserBySession, function(req, res) {
  res.locals.user.accounts.push(req.body);
  res.locals.user.save(function(err, savedUser) {
    if(err) {
      console.log(err);
      return res.send({status: 500, err: err});
    }

    if(req.xhr) {
      res.send({status: 200});
    } else {
      res.redirect('/user/mail');
    }
  });
});

router.get('/mail', preventUnAuthUser, getUserBySession, function(req, res) {
  res.render('user/mail');
});

module.exports = router;

//require('../lib/imap');
