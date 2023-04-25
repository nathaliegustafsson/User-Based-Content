import { InferSchemaType, Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [3, "Content must be at least 3 characters"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
    strict: "throw",
  }
);

export type Post = InferSchemaType<typeof postSchema>;

export const PostModel = model("post", postSchema);
