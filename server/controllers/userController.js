const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "web-talk";
const filesystem = require("fs");

const register = async (req, res, next) => {
  // file handle
  console.log(req.file);
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  filesystem.renameSync(path, newPath);
  // destructure data
  const { name, email, password } = req.body;

  // password hash
  const hasPassword = await bcrypt.hashSync(password, 10);
  // check for existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(409).json({ message: " Email already registered" });
    } else {
      const user = await User.create({
        name,
        email,
        avatar: newPath,
        password: hasPassword,
      });
      res.status(201).json({ message: "Registration Successful" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email: email });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log(isValidPassword);
      if (isValidPassword) {
        // prepare admin information object for token
        const userInfo = {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: process.env.BASE_URL + user.avatar,
          role: "user",
          isLoggedIn: true,
        };
        // generate token
        const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY, {
          // expiresIn: process.env.JWT_EXPIRATION,
        });
        console.log(token);
        // set cookie
        res
          .status(200)
          .cookie("token", token, {
            // expiresIn: process.env.JWT_EXPIRATION,
            // maxAge: process.env.JWT_EXPIRATION,
            // // signed: true,
            // httpOnly: true,
          })
          .json(userInfo);
      } else {
        res.status(408).json({ message: "Password dose not matched" });
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const savePost = async (req, res, next) => {
  console.log(req.file);
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

exports.register = register;
exports.login = login;
exports.savePost = savePost;
exports.getAllPosts = getAllPosts;
exports.getFilteredPosts = getFilteredPosts;
