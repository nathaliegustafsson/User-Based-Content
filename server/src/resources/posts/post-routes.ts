import express from "express";
import { isAuthenticated } from "../../middlewares/auth-middleware";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "./post-controller";

const postRouter = express
  .Router()
  .get("/api/posts", getAllPosts)
  .get("/api/posts/:id", getPostById)
  .post("/api/posts", isAuthenticated, createPost)
  .put("/api/posts/:id", isAuthenticated, updatePost)
  .delete("/api/posts/:id", isAuthenticated, deletePost);

export default postRouter;
