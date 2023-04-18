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
  });

export default postRouter;