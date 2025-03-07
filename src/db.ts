import mongoose, { Schema, Types, model } from "mongoose";
import { MONGO_URL } from "./config";

mongoose.connect(MONGO_URL);

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = model("Users", userSchema);

const contentTypes = ["image", "video", "article", "audio", "twitter"];

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "Users", required: true },
});

export const Content = model("Content", contentSchema);

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

export const Tag = model("Tag", tagSchema);

const linkSchema = new Schema({
  hash: String,
  userId: { type: Types.ObjectId, ref: "Users", required: true, unique: true },
});

export const Link = model("Links", linkSchema);
