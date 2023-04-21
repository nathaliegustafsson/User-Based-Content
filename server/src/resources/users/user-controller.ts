import argon2 from "argon2";
import { Request, Response } from "express";
import UserModel from "./user-model";

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
  const { username, password, adminSecret } = req.body;

  // Check if the username already exists
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return res.status(400).json("Username is already in use");
  }

  const hashedPassword = await argon2.hash(password);
  // If the adminSecret matches, set the user as an admin
  const isAdmin = adminSecret === process.env.ADMIN_SECRET;
  const user = new UserModel({
    username,
    password: hashedPassword,
    isAdmin,
  });

  await user.save();
  res.status(201).json(user);
}

// Login user
export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(400).json("Incorrect username or password");
  }

  const isAuth = await argon2.verify(user.password, password);
  if (!isAuth) {
    return res.status(400).json("Incorrect username or password");
  }

  // Check session/cookie
  req.session!.username = user.username;
  req.session!.userId = user.id; // Stores user ID in the session
  req.session!.isAdmin = user.isAdmin; // Stores isAdmin status in the session

  // Send response
  res.status(200).json("Login successful");
}

// Logout user
export function logoutUser(req: Request, res: Response) {
  if (!req.session) {
    return res.status(401).json("You are not logged in!");
  }

  req.session = null;
  res.status(200).json("Logout successful");
}
