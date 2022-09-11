const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const Auth = require('../controllers/auth.controller');

router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.delete('/logout', Auth.logout);
router.get('/user', authMiddleware, Auth.getUser)

module.exports = router;