import { Request, Response } from "express";
import * as Yup from "yup";
import PostModel from "./post-model";
import postValidationSchema from "./post-validation";

export async function getAllPosts(req: Request, res: Response) {
  const posts = await PostModel.find({});
  res.status(200).json(posts);
}

export async function getPostById(req: Request, res: Response) {
  const postId = req.params.id;
  const post = await PostModel.findById(postId);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: `Post with ID ${postId} not found.` });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    await postValidationSchema.validate(req.body); // Validate the request body
    const userId = req.session!.userId;
    const post = await PostModel.create({ ...req.body, author: userId });
    res.json(post);
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
}

export async function updatePost(req: Request, res: Response) {
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
}

export async function deletePost(req: Request, res: Response) {
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
}
