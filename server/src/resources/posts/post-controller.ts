import { Request, Response } from "express";
import "express-async-errors";
import { Error, Types as MongooseTypes } from "mongoose";
import { PostModel } from "./post-model";

export async function getAllPosts(req: Request, res: Response) {
  const posts = await PostModel.find({});
  res.status(200).json(posts);
}

export async function getPostById(req: Request, res: Response) {
  const postId = req.params.id;
  // Check if the provided postId is a valid ObjectId - vet inte om vi ska ha denna?
  if (!MongooseTypes.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: `Invalid post ID.` });
  }
  const post = await PostModel.findById(postId);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json(`/${postId} not found.`);
  }
}

export async function createPost(req: Request, res: Response) {
  if (!req.session?.user) {
    res.status(401).json("You must login to create a post in your username");
    return;
  }

  try {
    const postData = { ...req.body, author: req.session.user };
    const post = new PostModel(postData);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    if ((error as Error.ValidationError).name === "ValidationError") {
      res.status(400).json((error as Error.ValidationError).message);
    } else {
      res.status(500).json("An unexpected error occurred.");
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
    return res.status(403).json("Post not found or not owned by the user");
  }

  // Update the post
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updatedPost);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).json(error.message);
    } else if (error instanceof Error.CastError) {
      res.status(400).json("not found");
    } else {
      res.status(500).json("An unexpected error occurred.");
    }
  }
}

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
