const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    images: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);
const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
