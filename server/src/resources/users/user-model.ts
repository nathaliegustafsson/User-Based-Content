import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("user", userSchema);

export default UserModel;
