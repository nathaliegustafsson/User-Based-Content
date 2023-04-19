import cookieSession from "cookie-session";
import express from "express";
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
    name: "login",
    secure: false,
    httpOnly: true,
    secret: "hgsgshtdhpdhdhdndbdsplladawgsbf",
    maxAge: 1000 * 20,
  })
);

// Routes
app.use(postRouter);
app.use(userRouter);
