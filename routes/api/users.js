const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const path = require("path")
const Post = require("../../models/Post")
const config = require("config");
const auth = require("../../middleware/auth")
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
router.post("/avatar/upload", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({msg: "User was not found"})
    }

    if (!req.files) {
      return res.status(400).json({msg: "No file uploaded"});
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({msg: "Please upload an image file"})
    }

    // Create custom filename
    file.name = `avatar_${user._id}${path.parse(file.name).ext}`;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(500).send("Problem with file upload");
      }

      await User.findByIdAndUpdate(req.user.id, {avatar: file.name});

      res.status(200).json({fileName: file.name, filePath: `/uploads/${file.name}`});
    })
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({msg: "Server error"});
  }
})



module.exports = router;