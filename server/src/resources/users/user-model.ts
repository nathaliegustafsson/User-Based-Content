import argon2 from "argon2";
import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [32, "Username cannot exceed 32 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  }
);

userSchema.pre("save", async function (next) {
  const doc = this as mongoose.Document & { password?: string }

  // Hash password
  if (doc.isModified('password') && doc.password) {
  doc.password = await argon2.hash(doc.password, {
    memoryCost: 1024,
    timeCost: 2,
  })};
  next();
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("user", userSchema);
