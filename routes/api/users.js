const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const path = require("path");
const Post = require("../../models/Post");
const sgMail = require('@sendgrid/mail');
const config = require("config");
const auth = require("../../middleware/auth");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }


      user = new User({
        name,
        email,
        password
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
        config.get("jwtSecret"),
        { expiresIn: 360000 },
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

// @route    POST api/users/avatar
// @desc     Update Users Avatar
// @access   Private
router.post("/avatar", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({msg: "User was not found"})
    }

    if (!req.file) {
      return res.status(400).json({msg: "Please upload a file"});
    }

    const imageUrl = "/" + req.file.path.replace("\\" ,"/");;
    
     user = await User.findByIdAndUpdate(req.user.id, {avatar: imageUrl});
     await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({msg: "Server error"});
  }
})

// @route    POST api/users/email/:id
// @desc     Send Email to a User
// @access   Private
router.post("/email/:id",   [
  auth,
  [
    check('subject', 'Subject is required')
      .not()
      .isEmpty(),
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ]
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id);
    const achievingUser = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({msg: "User was not found"})
    }

    if (!achievingUser) {
      return res.status(404).json({msg: "The achieving user could not be found"});
    }

     sgMail.setApiKey(config.get("sendGridApi"));
     const msg = {
      to: achievingUser.email,
      from: user.email,
      subject: req.body.subject,
      text: req.body.text
     }
    sgMail.send(msg);
    return res.status(200).json({msg: "Email Sent"})
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({msg: "Server error"});
  }
})





module.exports = router;