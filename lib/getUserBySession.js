
var models = require('../models');

module.exports = function getUserBySession(req, res, next) {
  models.User.findById(req.session.user.id).exec(function(err, foundUser) {
    if(err) {
      return next(err);
    }

    if(!foundUser) {
      return req.session.destroy(function(err) {
        if(err) {
          return next(err);
        }
        res.redirect('/');
      });
    }
    res.locals.user = foundUser;
    next();
  });
};
