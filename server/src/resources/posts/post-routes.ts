import express from "express";
import { isAuthenticated } from "../../auth-middleware";
import PostModel from "./post-model";

const postRouter = express
  .Router()
  .get("/api/posts", async (req, res) => {
    const posts = await PostModel.find({});
    res.json(posts);
  })
  .post("/api/posts", isAuthenticated, async (req, res) => {
    const post = await PostModel.create(req.body);
    res.json(post);
  });

export default postRouter;
