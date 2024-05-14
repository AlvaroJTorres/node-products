const {check, validationResult} = require('express-validator');

const validateSignUp = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('User name can not be empty!')
    .isLength({ min: 2 }),
  check('username')
    .trim()
    .notEmpty()
    .withMessage('User username can not be empty!')
    .isLength({ min: 3, max: 20 }),
  check('email')
    .trim()
    .isEmail()
    .withMessage('Enter a valid email')
    .notEmpty()
    .withMessage('User email can not be empty!'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('User password can not be empty!')
    .isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
    next()
  }
]

const validateSignIn = [
  check('username')
    .trim()
    .notEmpty()
    .withMessage('User username can not be empty!'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('User password can not be empty!'),
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
    next()
  }
]

const validateChangePassword = [
  check('username')
    .trim()
    .notEmpty()
    .withMessage('User username can not be empty!'),
  check('new_password')
    .trim()
    .notEmpty()
    .withMessage('User new password can not be empty!'),
  check('confirmed_password')
    .trim()
    .notEmpty()
    .withMessage('User confirmed password can not be empty!'),
]

module.exports = {
  validateSignUp,
  validateSignIn,
  validateChangePassword
}