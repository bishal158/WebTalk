const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "web-talk";
const filesystem = require("fs");

const savePost = async (req, res, next) => {
  console.log(req.file);
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
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author").sort({ createdAt: -1 });
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
        .populate("author")
        .sort({ createdAt: -1 });
      res.status(200).json(posts);
    } else {
      const filteredPosts = await Post.find(filter)
        .populate("author")
        .sort({ createdAt: -1 });
      res.status(200).json(filteredPosts);
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};
const getSinglePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const postInfo = await Post.findById(id).populate("author");
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
const likePost = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
};
const disLikePost = async (req, res, next) => {};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET_KEY, {}, async (error, info) => {
    try {
      const post = await Post.findById(id);
      console.log(post.author);
      console.log(info);
      if (!post || post.author.toString() !== info._id) {
        res.status(401).json({ message: "Unauthorized" });
      }
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
exports.savePost = savePost;
exports.getAllPosts = getAllPosts;
exports.getFilteredPosts = getFilteredPosts;
exports.getSinglePost = getSinglePost;
exports.likePost = likePost;
exports.disLikePost = disLikePost;
exports.deletePost = deletePost;