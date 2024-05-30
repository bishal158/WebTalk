const express = require("express");
const router = express.Router();
const {
  savePost,
  getAllPosts,
  getFilteredPosts,
  getSinglePost,
  likePost,
  deletePost,
  updatePost,
  getTrendingPosts,
  saveComment,
  getAllComments,
  getAllLikes,
} = require("../controllers/postController");
const upload = require("../middlewares/upload");
router.post("/savePost", upload.single("cover"), savePost);
router.get("/getAllPost", getAllPosts);
router.get("/getFilteredPosts", getFilteredPosts);
router.get("/getSinglePost/:id", getSinglePost);
router.delete("/deletePost/:id", deletePost);
router.put("/updatePost/:id", upload.single("cover"), updatePost);
router.post("/likedPost/:id", likePost);
router.get("/getTrendingPosts", getTrendingPosts);
router.post("/comment/saveComment", saveComment);
router.get("/comment/post/:id/allComments", getAllComments);
router.get("/likes/post/:id/allLikes", getAllLikes);
module.exports = router;
