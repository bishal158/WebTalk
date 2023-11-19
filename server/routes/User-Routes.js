const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const filesystem = require("fs");
const SECRET_KEY = "secret";

// models
const User = require("../models/User");
const Post = require("../models/Post");

// registration new users
router.post("/register", async (request, response) => {
  try {
    if (!request.body.Inputs.email || !request.body.Inputs.password) {
      return response.status(400).send({ message: "Send all required fields" });
    }
    const password = request.body.Inputs.password;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      email: request.body.Inputs.email,
      password: hashPassword,
    };
    const user = await User.create(newUser);
    if (user) {
      return response
        .status(200)
        .send({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error.message);
    let existingUser = await User.findOne({ email: request.body.Inputs.email });
    if (existingUser) {
      return response.status(409).send({ message: "User already exists" });
    }
    response.status(500).send({ message: error.message });
  }
});

// login a user
router.post("/login", async (request, response) => {
  try {
    if (!request.body.Inputs.email || !request.body.Inputs.password) {
      return response.status(400).send({ message: "Send all required fields" });
    }
    const { email, password } = request.body.Inputs;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      return new Error(err);
    }
    if (!existingUser) {
      return response
        .status(400)
        .json({ message: "User not found. Signup Please" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password,
    );
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        SECRET_KEY,
        {},
      );
      console.log(token);
      response.status(200).cookie("token", token).json({
        id: existingUser._id,
        email: existingUser.email,
      });
    } else {
      response.status(400).json({ message: "Invalid Email / Password" });
    }
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// get the profile
router.get("/profile", (request, response) => {
  const { token } = request.cookies;
  jwt.verify(token, SECRET_KEY, {}, (error, info) => {
    if (error) throw error;
    response.json(info);
  });
  response.json(token);
});

// logout
router.post("/logout", (request, response) => {
  response.cookie("token", "").json("ok");
});

// post

router.post("/post", upload.single("images"), async (request, response) => {
  const { originalname, path } = request.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  filesystem.renameSync(path, newPath);
  const { token } = request.cookies;
  jwt.verify(token, SECRET_KEY, {}, async (error, info) => {
    if (error) throw error;
    const { title, summary, content } = request.body;
    const post = await Post.create({
      title,
      summary,
      content,
      images: newPath,
      author: info.id,
    });
    response.json(post);
  });
});

// getPost
router.get("/getPost", async (request, response) => {
  response.json(
    await Post.find()
      .populate("author", ["email"])
      .sort({ createdAt: -1 })
      .limit(20),
  );
});

// getPost Info
router.get("/post/:id", async (request, response) => {
  response.json({});
});

module.exports = router;
