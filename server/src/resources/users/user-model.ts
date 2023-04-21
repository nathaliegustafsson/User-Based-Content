import argon2 from "argon2";
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

userSchema.pre("save", async function (next) {
  // kryptera lösenordet
  this.password = await argon2.hash(this.password);
  next();
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("user", userSchema);
