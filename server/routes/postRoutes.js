const express = require("express");
const router = express.Router();
const {
  savePost,
  getAllPosts,
  getFilteredPosts,
  getSinglePost,
  likePost,
  disLikePost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
router.post("/savePost", upload.single("cover"), savePost);
router.get("/getAllPost", getAllPosts);
router.get("/getFilteredPosts", getFilteredPosts);
router.get("/getSinglePost/:id", getSinglePost);
router.delete("/deletePost/:id", deletePost);
router.put("/updatePost/:id", upload.single("cover"), updatePost);
router.put("/likedPost/:id", likePost);
router.put("/disLikedPost/:id", disLikePost);

module.exports = router;
