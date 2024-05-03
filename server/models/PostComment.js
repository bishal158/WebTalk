const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCommentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, required:true, ref: "Post" },
    commentedBy: { type: Schema.Types.ObjectId,required:true, ref: "User" },
    comment: String,
  },
  {
    timestamps: true,
  },
);
const PostCommentModel = mongoose.model("PostComment", PostCommentSchema);
module.exports = PostCommentModel;
