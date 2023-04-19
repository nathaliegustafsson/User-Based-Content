import express from "express";
import UserModel from "./user-model";

const userRouter = express
  .Router()
  .get("/api/users", async (req, res) => {
    const users = await UserModel.find({});
    res.json(users);
  })
  .post("/api/users", async (req, res) => {
    const user= await UserModel.create(req.body);
    res.json(user);
  });

export default userRouter;
