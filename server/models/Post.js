const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);
const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
