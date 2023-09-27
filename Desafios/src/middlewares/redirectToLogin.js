const redirectToLogin = (req, res, next) => {
    res.redirect('/api/views/session/login');
  };
  
module.exports = redirectToLogin