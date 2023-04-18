import express from 'express';
import "express-async-errors";

export const app = express();

// SKRIV DIN SERVERKOD HÄR!

// Global middlewares
app.use(express.json());

// Routes
// app.use(postRouter);
// app.use(userRouter);
