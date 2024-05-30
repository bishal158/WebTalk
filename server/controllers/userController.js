const User = require("../models/User");
const Post = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "web-talk";
const cloudinary = require("../utils/cloudinary");
const register = async (req, res, next) => {
  // file handle
  let avatar_url;
  // destructure data
  const { name, email, password } = req.body;
  // password hash
  const hasPassword = await bcrypt.hashSync(password, 10);
  // check for existing user
  let existingUser;
  try {
    await cloudinary.uploader
      .upload(req.file.path)
      .then(async (value) => {
        avatar_url = value.secure_url;
        existingUser = await User.findOne({ email: email });
        if (existingUser) {
          res.status(409).json({ message: " Email already registered" });
        } else {
          const user = await User.create({
            name,
            email,
            avatar: avatar_url,
            password: hasPassword,
          });
          res.status(201).json({ message: "Registration Successful" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "File exceeds 10MB" });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
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
          avatar: user.avatar,
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
const logout = async (req, res) => {
  res.cookie("token", "").json({ message: "Logout Successful" });
};

const totalCount = async (req, res) => {
  try {
    const totalUser = await User.countDocuments({});
    const totalPost = await Post.countDocuments({});

    let totalCount = {
      totalUser,
      totalPost,
    };
    console.log(totalUser);
    res.status(200).json(totalCount);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.totalCount = totalCount;
