import { Request, Response } from "express";
import "express-async-errors";
import mongoose, { Error, Types as MongooseTypes } from "mongoose";
import * as Yup from "yup";
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
  const post = await PostModel.findById(postId);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json(`/${postId} not found.`);
  }
}

export async function createPost(req: Request, res: Response) {
  if (!req.session?.userId) {
    res.status(401).json("You must login to create a post in your username");
    return;
  }

  // Validate request body with Yup
  try {
    await postCreateValidationSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (validationError) {
    if (validationError instanceof Yup.ValidationError) {
      const validationErrors = validationError.inner
        .map((err) => `"${err.path}": ${err.message}`)
        .join(", ");
      return res
        .status(400)
        .json(`Post validation failed: ${validationErrors}`);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }

  try {
    const postData = { ...req.body, author: req.session.userId };
    const post = new PostModel(postData);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const validationErrors = Object.entries(error.errors)
        .map(([key, err]: [string, any]) => `"${key}": ${err.message}`)
        .join(", ");

      res.status(400).json(`Post validation failed: ${validationErrors}`);
    } else {
      res.status(500).json("An unexpected error occurred.");
    }
  }
}

export async function updatePost(req: Request, res: Response) {
  const postId = req.params.id;
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json("You must be logged in to update a post.");
  }

  try {
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
    try {
      await postUpdateValidationSchema.validate(req.body, {
        abortEarly: false,
      });
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        return res.status(400).json(validationError.message);
      } else {
        return res.status(500).json("An unexpected error occurred.");
      }
    }

    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.entries(error.errors)
        .map(([key, err]) => `"${key}": ${err.message}`)
        .join(", ");
      res.status(400).json(`Post validation failed: ${validationErrors}`);
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
