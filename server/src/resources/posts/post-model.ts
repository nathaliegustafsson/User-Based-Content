import { InferSchemaType, Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type Post = InferSchemaType<typeof postSchema>;

const PostModel = model("post", postSchema);

export default PostModel;
