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
    const post = await PostModel.create(req.body);
    res.json(post);
  })
  .put("/api/posts/:id", isAuthenticated, async (req, res) => {
    const postId = req.params.id;

    // Check if the post exists
    const existingPost = await PostModel.findById(postId);
    if (!existingPost) {
      return res.status(404).json("Post not found");
    }
    // Update the post
    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.json(updatedPost);
  })
  .delete("/api/posts/:id", isAuthenticated, async (req, res) => {
    const postId = req.params.id;
    const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

    if (deletedPost) {
      res.status(204).json(deletedPost);
    } else {
      res.status(404).json({ error: `Post with ID ${postId} not found.` });
    }
  });

export default postRouter;
