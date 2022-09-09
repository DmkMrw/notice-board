const express = require('express');
const router = express.Router();

const Auth = require('../controllers/auth.controller');

router.post('/register', Auth.register);
router.post('/login', Auth.login);
// router.get('/user', Auth.user)

module.exports = router;