import argon2 from "argon2";
import { Request, Response } from "express";
import UserModel from "./user-model";

export function getLoggedInUserInfo(req: Request, res: Response) {
  if (!req.session?.email) {
    return res.status(401).json("You must login!");
  }
  res.status(200).json(req.session);
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await UserModel.find();
  res.status(200).json(users);
}

export async function registerUser(req: Request, res: Response) {
  const { email, username, password } = req.body;

  // Check if the email already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json("Email is already in use");
  }

  const hashedPassword = await argon2.hash(password);
  const user = new UserModel({ email, username, password: hashedPassword });

  await user.save();
  res.status(201).json(user);
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json("Incorrect email or password");
  }

  const isAuth = await argon2.verify(user.password, password);
  if (!isAuth) {
    return res.status(400).json("Incorrect email or password");
  }

  // Check session/cookie
  req.session!.email = user.email;
  req.session!.userId = user._id.toString(); // Store user ID in the session

  // Send response
  res.status(200).json("Login successful");
}
