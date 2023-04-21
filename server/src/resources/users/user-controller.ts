import argon2 from "argon2";
import { Request, Response } from "express";
import * as Yup from "yup";
import { UserModel } from "./user-model";
import { userRegistrationSchema } from "./user-validation";

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
  try {
    // Validate request body
    const validatedData = await userRegistrationSchema.validate(req.body);

    // Check if a user with the same username already exists
    const existingUser = await UserModel.findOne({
      username: validatedData.username,
    });
    if (existingUser) {
      res
        .status(400)
        .json("Username already exists. Please choose a different one.");
      return;
    }

    // Create and save the new user
    const user = new UserModel(validatedData);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
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
  // req.session!.isAdmin = user.isAdmin; // Stores isAdmin status in the session

  // Create a new user object without the password field
  const userResponse = {
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };

  // Send response
  res.status(200).json(userResponse);
}

// Logout user
export function logoutUser(req: Request, res: Response) {
  if (!req.session) {
    return res.status(401).json("You are not logged in!");
  }
  req.session = null;
  res.status(204);
}
