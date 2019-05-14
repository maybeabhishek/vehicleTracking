var middlewareObj = {}
middlewareObj.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    var err = "Please Login to continue";
    res.redirect('/login?err='+err);
  }

module.exports = middlewareObj;