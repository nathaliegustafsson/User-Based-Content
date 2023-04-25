import argon2 from "argon2";
import { Request, Response } from "express";
import { Error } from "mongoose";
import { UserModel } from "./user-model";

export function getLoggedInUserInfo(req: Request, res: Response) {
  if (!req.session?.username) {
    return res.status(401).json("You must login!");
  }
  res.status(200).json(req.session);
}

// Get all users
export async function getAllUsers(req: Request, res: Response) {
  const users = await UserModel.find({});
  res.status(200).json(users);
}

// Register user
export async function registerUser(req: Request, res: Response) {
  const { username } = req.body;

  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    return res.status(409).json("Username already exists");
  }

  try {
    const user = new UserModel(req.body);
    await user.save();

    res.status(201).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).json(error.message);
    } else {
      res.status(500).json("An unexpected error occurred.");
    }
  }
}

// Login user
export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(401).json("Incorrect username");
  }
  const isAuth = await argon2.verify(user.password, password);
  if (!isAuth) {
    return res.status(401).json("Incorrect password");
  }
  // Check session/cookie
  req.session!.username = user.username;
  req.session!.userId = user.id; // Stores user ID in the session
  req.session!.isAdmin = user.isAdmin; // Stores isAdmin status in the session

  // Create a new user object without the password field
  const userResponse = {
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };

  // Send response
  res.status(200).json(userResponse);
}

export async function getLoggedInUser(req: Request, res: Response) {
    // Create a new user object without the password field
    const userResponse = {
      _id: req.session?.userId,
      username: req.session?.username,
      isAdmin: req.session?.isAdmin,
    };
  
    // Send response
    res.status(200).json(userResponse);
}

// Logout user
export function logoutUser(req: Request, res: Response) {
  req.session = null;
  res.setHeader(
    "Set-Cookie",
    `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  );
  res.sendStatus(204);
}
