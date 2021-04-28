let loginService = require('../service/authService')

exports.login = function(req, res) {
  loginService(req,res)
};
