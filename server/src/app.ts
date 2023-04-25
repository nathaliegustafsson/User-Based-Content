import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import * as Yup from "yup";
import postRouter from "./resources/posts/post-routes";
import userRouter from "./resources/users/user-router";

export const app = express();

// Global middlewares
app.use(express.json());
// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });
app.use(
  cookieSession({
    // name: "login",
    secure: false,
    httpOnly: true,
    secret: "hgsgshtdhpdhdhdndbdsplladawgsbf",
    maxAge: 1000 * 20,
  })
);

// Routes
app.use(postRouter);
app.use(userRouter);

// Error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Yup.ValidationError) {
    console.log(err);
    res.status(400).json(err.message);
  } else {
    console.error(err);
    res.status(500).json(err.message);
  }
});
