import mongoose, { Schema, model } from "mongoose";

mongoose.connect(
  "mongodb+srv://hamza:WDAEXr19oN20aXen@cluster0.alc6g.mongodb.net/brainly"
);

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", userSchema);

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

export const TagModel = model("Tag", tagSchema);

const contentTypes = ["image", "video", "article", "audio"];

const content = new Schema({
  link: { type: String, required: true },
  type: String,
  title: { type: String, required: true },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const ContentModel = model("Content", content);
