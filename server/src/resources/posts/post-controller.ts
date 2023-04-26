import { Request, Response } from "express";
import "express-async-errors";
import { Types as MongooseTypes } from "mongoose";
import { default as postCreateValidationSchema } from "./post-create-validation";
import { PostModel } from "./post-model";
import postUpdateValidationSchema from "./post-update-validation";

export async function getAllPosts(req: Request, res: Response) {
  const posts = await PostModel.find({});
  res.status(200).json(posts);
}
export async function getPostById(req: Request, res: Response) {
  const postId = req.params.id;
  // Check if the provided postId is a valid ObjectId
  if (!MongooseTypes.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: `Invalid post ID.` });
  }
  const post = await PostModel.findById(postId).populate('author', 'username');
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json(`/${postId} not found.`);
  }
}


// Create post
export async function createPost(req: Request, res: Response) {
  if (!req.session?.userId) {
    res.status(401).json("You must login to create a post in your username");
    return;
  }

  // Validate request body with Yup
  await postCreateValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  const postData = { ...req.body, author: req.session.userId };
  const post = new PostModel(postData);
  await post.save();
  res.status(201).json(post);
}

// Update Post
export async function updatePost(req: Request, res: Response) {
  const postId = req.params.id;
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json("You must be logged in to update a post.");
  }

  const post = await PostModel.findById(postId);
  if (!post) {
    return res.status(404).json(`Post with ID ${postId} not found.`);
  }

  if (post.author.toString() !== userId.toString()) {
    return res
      .status(403)
      .json("You do not have permission to update this post.");
  }

  // Validate request body with Yup
  await postUpdateValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(updatedPost);
}

// Delete post
export async function deletePost(req: Request, res: Response) {
  const postId = req.params.id;
  const userId = req.session!.userId;

  // Check if the post exists
  const existingPost = await PostModel.findById(postId);

  if (!existingPost) {
    return res.status(404).json(`/${postId} not found.`);
  }

  // Check if the post belongs to the user
  if (existingPost.author.toString() !== userId) {
    return res
      .status(403)
      .json("You do not have permission to delete this post");
  }

  // Delete the post
  await PostModel.findByIdAndDelete(postId);
  res.status(204).json({ message: "Post deleted successfully" });
}
