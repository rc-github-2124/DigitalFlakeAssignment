const express = require('express');
const { register, login, forgotPassword,getCurrentUser,logout } = require('../controllers/authController');
const { verifyToken } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/current-user', verifyToken, getCurrentUser);
router.post('/logout',logout);
module.exports = router;
