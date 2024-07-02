import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();
const userSchema = mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type:String,
      required: true,
      unique: true
   },
   password: {
      type:String,
      required:true
   }

}, {timestamps: true})

userSchema.pre('save', async function (next)  {
   try {
      const salt = await bcrypt.genSalt(9);
      this.password = await bcrypt.hash(this.password, salt);
   } catch (err) {
      console.log('error in user schema middleware', err);
   } finally {
      next();
   }
   
   console.log(hash);
   next();
   // bcrypt.hash(this.password, salt_roundes)
})
const userModel = mongoose.model('user-auth', userSchema);


export default userModel;