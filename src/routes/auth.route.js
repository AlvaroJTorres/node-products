const express = require('express');
const { registerUser, signInUser, changePassword, signOut } = require('../controllers/auth.controller');
const { validateSignUp, validateSignIn, validateChangePassword } = require('../middleware/authValidator.middleware');
const router = express.Router();

router.post('/sign-up', validateSignUp, registerUser);
router.post('/sign-in', validateSignIn, signInUser);
router.post('/sign-out', signOut);
router.patch('/change-password', validateChangePassword, changePassword)

module.exports = router;