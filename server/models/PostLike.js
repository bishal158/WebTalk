const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostLikeSchema = new Schema(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "Post" },
    liked_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

const PostLikeModel = mongoose.model("Post", PostLikeSchema);

module.exports = PostLikeModel;
