import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import postRouter from "./resources/posts/post-routes";
import userRouter from "./resources/users/user-router";

export const app = express();

// Global middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use(
  cookieSession({
    // name: "login",
    secure: false,
    httpOnly: true,
    secret: "hgsgshtdhpdhdhdndbdsplladawgsbf",
    maxAge: 3600000,
  })
);

// Routes
app.use(postRouter);
app.use(userRouter);

// Error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json(err.message);
});
