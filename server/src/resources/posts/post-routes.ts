import express from "express";
import { isAuthenticated } from "../../middlewares/auth-middleware";
import PostModel from "./post-model";

const postRouter = express
  .Router()
  .get("/api/posts", async (req, res) => {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
  })
  .post("/api/posts", isAuthenticated, async (req, res) => {
    const userId = req.session!.userId;
    const post = await PostModel.create({ ...req.body, author: userId });
    res.json(post);
  })
  .put("/api/posts/:id", isAuthenticated, async (req, res) => {
    const postId = req.params.id;
    const userId = req.session!.userId;

    // Check if the post exists and belongs to the user
    const existingPost = await PostModel.findOne({
      _id: postId,
      author: userId,
    });
    if (!existingPost) {
      return res.status(404).json("Post not found or not owned by the user");
    }
    // Update the post
    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.json(updatedPost);
  })
  .delete("/api/posts/:id", isAuthenticated, async (req, res) => {
    const postId = req.params.id;
    const userId = req.session!.userId;

    // Check if the post exists and belongs to the user
    const existingPost = await PostModel.findOne({
      _id: postId,
      author: userId,
    });
    if (!existingPost) {
      return res.status(404).json("Post not found or not owned by the user");
    }

    // Delete the post
    await PostModel.findByIdAndDelete(postId);
    res.status(204).json({ message: "Post deleted successfully" });
  });

export default postRouter;
