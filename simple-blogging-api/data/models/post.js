const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    imageUrl: {
      type: String,
      trim: true,
      default: null
    },
    status: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "Invalid status"
      },
      default: "Active"
    }
  },
  {
    timestamps: {
      createdAt: "createdAt"
    }
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
