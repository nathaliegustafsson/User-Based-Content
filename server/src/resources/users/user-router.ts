import express from "express";
import { loginUser, logoutUser, registerUser } from "./user-controller";
import UserModel from "./user-model";

const userRouter = express
  .Router()
  .get("/api/users", async (req, res) => {
    const users = await UserModel.find({});
    res.json(users);
  })
  .post("/api/users/register", registerUser)
  .post("/api/users/login", loginUser)
  .post("/api/users/logout", logoutUser);

export default userRouter;
