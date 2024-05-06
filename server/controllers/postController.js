const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/postcomment");
const Like = require("../models/postlike");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "web-talk";
const filesystem = require("fs");

// save a single post
const savePost = async (req, res, next) => {
  if (!req.file) {
    res.status(404).json({ message: "Upload a cover image" });
  } else {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    filesystem.renameSync(path, newPath);
    const { token } = req.cookies;
    jwt.verify(token, JWT_SECRET_KEY, {}, async (error, info) => {
      if (error) throw error;
      const { title, summary, content, category } = req.body;
      try {
        const post = await Post.create({
          title,
          summary,
          category,
          content,
          cover: newPath,
          author: info._id,
        });
        res.status(201).json(post);
      } catch (e) {
        res.status(500).json({ message: "Server error" });
      }
    });
  }
};

// get all the posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", ["name", "email", "avatar"])
      .sort({ createdAt: -1 });
    res.status(201).json(posts);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};
const getFilteredPosts = async (req, res, next) => {
  const { category } = req.query;
  const filter = {};
  if (category) {
    filter.category = category;
  }
  try {
    if (category === "All") {
      const posts = await Post.find()
        .populate("author", ["name", "email", "avatar"])
        .sort({ createdAt: -1 });
      res.status(200).json(posts);
    } else {
      const filteredPosts = await Post.find(filter)
        .populate("author", ["name", "email", "avatar"])
        .sort({ createdAt: -1 });
      res.status(200).json(filteredPosts);
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

// get a single post
const getSinglePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const postInfo = await Post.findById(id)
      .populate("author", ["name", "email", "avatar"])
      .populate("comments")
      .populate("likes");
    // console.log(postInfo);
    if (postInfo) {
      res.status(200).json(postInfo);
    } else {
      res.status(404).json({ message: "Opps!!!Post not available" });
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};
// delete a post
const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET_KEY, {}, async (error, info) => {
    try {
      const post = await Post.findById(id);
      console.log(post.author);
      // console.log(info);
      if (!post || post.author.toString() !== info._id) {
        res.status(401).json({ message: "Unauthorized to delete" });
      }
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
// update a post
const updatePost = (req, res) => {
  const { title, summary, cover, content, category, id } = req.body;
  const { token } = req.cookies;
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    newPath = path + "." + extension;
    console.log(newPath);
    filesystem.renameSync(path, newPath);
  }
  jwt.verify(token, JWT_SECRET_KEY, {}, async (error, info) => {
    if (error) throw error;
    try {
      const post = await Post.findById(id);
      if (!post || post.author.toString() !== info._id) {
        res.status(401).json({ message: "Unauthorized to update" });
      } else {
        const updatedPost = await Post.findByIdAndUpdate(id, {
          title,
          summary,
          category,
          content,
          cover: newPath ? newPath : post.cover,
        });
        res.status(200).json(updatedPost);
      }
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
const getTrendingPosts = async (req, res, next) => {
  try {
    const aggregation = [
      { $sort: { likes: 1 } }, // Sort by likes count descending
      { $limit: 5 }, // Limit to top 10 posts (optional)
    ];
    const trendingPosts = await Post.aggregate(aggregation);
    res.status(200).json(trendingPosts);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// like and dislike a post
const likePost = async (req, res, next) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET_KEY, {}, async (error, info) => {
    if (error) throw error;
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ message: "No blog post found" });
    } else {
      const like = await Like.findOne({
        postId: id,
        likedBy: info._id,
      });
      try {
        if (!like) {
          const newLike = await Like.create({
            postId: id,
            likedBy: info._id,
          });
          await Post.updateOne(
            { _id: post._id },
            {
              $push: { likes: newLike._id },
            },
          );
          res.status(200).json({
            message: "Liked successfully",
            liked: true,
          });
        } else {
          await Like.deleteOne({ _id: like._id });
          await Post.updateOne(
            { _id: like.postId },
            {
              $pull: { likes: like._id },
            },
          );
          res
            .status(200)
            .json({ message: "Like successfully removed", liked: false });
        }
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    }
  });
};
// save a new comment on a post
const saveComment = async (req, res, next) => {
  const { postId, comment } = req.body;
  const { token } = req.cookies;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post Not Found" });
    }
    jwt.verify(token, JWT_SECRET_KEY, {}, async (error, info) => {
      if (error) throw error;
      const newComment = await Comment.create({
        postId: post._id,
        commentedBy: info._id,
        comment: comment,
      });
      await Post.updateOne(
        { _id: post._id },
        {
          $push: { comments: newComment._id },
        },
      );
      res.status(200).json({ message: "Commented successfully" });
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all comments of a post
const getAllComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ postId: id }).populate(
      "commentedBy",
      ["name", "email", "avatar"],
    );
    res.status(200).json(comments);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllLikes = async (req, res) => {
  const { id } = req.params;
  try {
    const likes = await Like.find({ postId: id }).populate("likedBy", [
      "name",
      "email",
      "avatar",
    ]);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.savePost = savePost;
exports.getAllPosts = getAllPosts;
exports.getFilteredPosts = getFilteredPosts;
exports.getSinglePost = getSinglePost;
exports.deletePost = deletePost;
exports.updatePost = updatePost;
exports.likePost = likePost;
exports.getTrendingPosts = getTrendingPosts;
exports.saveComment = saveComment;
exports.getAllComments = getAllComments;
exports.getAllLikes = getAllLikes;
