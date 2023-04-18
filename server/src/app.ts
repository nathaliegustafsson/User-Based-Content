import express from "express";
import "express-async-errors";
import postRouter from "./resources/posts/post-routes";

export const app = express();

// Global middlewares
app.use(express.json());

// Routes
app.use(postRouter);
// app.use(userRouter);
