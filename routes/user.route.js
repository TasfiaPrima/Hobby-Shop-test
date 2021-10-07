const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../models/user.model');

// @route    POST api/users
// @desc     Register user
// @access   Publicy
router.post(
  '/',
  check('firstname', 'First Name is required').notEmpty(),
  check('lastname', 'Last Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  check('confirm_password','Enter password again/Password does not match.Please try again').custom(async (confirmPassword, {req}) => {
    const password = req.body.password

    // If password and confirm password not same
    // don't allow to sign up and throw error
    if(password !== confirmPassword){
      throw new Error('Passwords must be same')
    }
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password,confirm_password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',//size
          r: 'pg',//rating
          d: 'mm'//default
        }),
        { forceHttps: true }
      );

      user = new User({
        firstname,
        lastname,
        email,
        avatar,
        password,
        confirm_password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: '3 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
