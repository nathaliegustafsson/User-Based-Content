import express from "express";
import { loginUser, registerUser } from "./user-controller";
import UserModel from "./user-model";

const userRouter = express
  .Router()
  .get("/api/users", async (req, res) => {
    const users = await UserModel.find({});
    res.json(users);
  })
  .post("/api/users/signup", registerUser)

  .post("/api/users/signin", loginUser);

export default userRouter;
