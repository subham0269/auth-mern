import mongoose from "mongoose";
import dotenv from 'dotenv';
import { hashPassword } from "../utils/cryptoHelpers.js";
dotenv.config();
const userSchema = mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   salt: {
      type: String,
   },
   password: {
      type: String,
      required: true
   }

}, { timestamps: true })

userSchema.pre('save', function (next) {
   try {
      const { salt, hash } = hashPassword(this.password)
      this.salt = salt;
      this.password = hash;
   } catch (err) {
      console.log('error in user schema middleware', err);
   }
   next();
})
const userModel = mongoose.model('user-auth', userSchema);


export default userModel;