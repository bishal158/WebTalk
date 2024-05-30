const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  totalCount,
} = require("../controllers/userController");
const upload = require("../middlewares/upload");
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/totalCount", totalCount);
module.exports = router;
