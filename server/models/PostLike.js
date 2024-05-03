const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostLikeSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    likedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

const PostLikeModel = mongoose.model("PostLike", PostLikeSchema);

module.exports = PostLikeModel;
