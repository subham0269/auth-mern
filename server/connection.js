import mongoose from "mongoose";

export default async function mongodbConnect(URI) {
   return await mongoose.connect(URI);
}