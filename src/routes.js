const express = require('express');

// Middlewares
const auth = require("./middleware/auth");

// Controllers
const authController = require('./controllers/authController');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send( { title: 'Express' });
});

router.get('/login', auth,authController.login);

module.exports = router