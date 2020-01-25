const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Comment = require("../../models/Comment")
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');



// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [
    auth,
    [
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
      const newPost = new Post({
        text: req.body.text,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/posts/:id
// @desc     Update a post
// @access   Private
router.put(
  '/:id',
  [
    auth,
    [
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
      let post = await Post.findById(req.params.id)
      console.log(post);
      if (!post) {
        return res.status(404).json({msg: "Post not found"})
      }

      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({msg: "You are not authorized"});
      }

      post = await Post.findOneAndUpdate(req.params.id, req.body);
      console.log(post);
      await post.save();
      res.status(200).json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).populate({
      path: "user",
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
      }
    }).exec()

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user");

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});



// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Comment.deleteMany({post: post._id})
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/dislike/:id
// @desc     Like a post
// @access   Private
router.put('/dislike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been disliked
    if (
      post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already disliked' });
    }

    post.dislikes.unshift({user: req.user.id});

    await post.save();

    res.json(post.dislikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/posts/comments/:id
// @desc     Get all comments that belongs to a post
// @access   Private
router.get('/comments/:id', auth, async (req, res) => {
  try {
    const comments = await Comment.find({post: req.params.id}).sort({date: -1}).populate("user").select("-password");

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
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
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      let comment = new Comment({
        text: req.body.text,
        post: req.params.id,
        user: req.user.id
      });

      comment = await comment.save();

      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/posts/comments/:id
// @desc     Update a comment
// @access   Private
router.put(
  '/comments/:id',
  [
    auth,
    [
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
      let comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(404).json({msg: "Post not found"})
      }

      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({msg: "You are not authorized"});
      }

      comment = await Comment.findOneAndUpdate(req.params.id, req.body);
      await comment.save();
      res.status(200).json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    DELETE api/posts/comment/:commentId 
// @desc     Delete comment
// @access   Private
router.delete("/comment/:commentId", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ msg: "Comment do not exist" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await comment.remove();

    res.json({msg: "Comment Removed"})
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;