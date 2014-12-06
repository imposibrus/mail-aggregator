
module.exports = function preventUnAuthUser(req, res, next) {
  if(!req.session.user || !req.session.user.id) {
    var err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }
  next();
};
