const express = require("express");
const postRouter = express.Router();
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postTitle: String,
  postContent: String,
  postAuthor: String,
  postCreatedAt: { type: Date, default: Date.now },
});

const PostModel = mongoose.model("Post", postSchema);

postRouter.post("/", async (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve posts", error: err.message });
  }
});

postRouter.put("/:id", async (req, res) => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
});

module.exports = postRouter;
