import express from "express";
import PostModel from "./post-model";

const postRouter = express
  .Router()
  .get("/api/posts", async (req, res) => {
    const posts = await PostModel.find({});
    res.json(posts);
  })
  .post("/api/posts", async (req, res) => {
    const post = await PostModel.create(req.body);
    res.json(post);
  })
  .delete("/api/posts/:id", async (req, res) => {
    const postId = req.params.id;
    const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

    if (deletedPost) {
      res.status(204).json(deletedPost);
    } else {
      res.status(404).json({ error: `Post with ID ${postId} not found.` });
    }
  });

export default postRouter;
