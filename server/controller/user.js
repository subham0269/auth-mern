import userModel from "../models/users.js";
import { checkPasswordHash } from "../utils/cryptoHelpers.js";

export const handleUserSignup = async (req, res) => {
   const { username, email, password } = req.body;
   try {
      const userObj = await userModel.create({ username, email, password })
      if (!userObj) {
         res.status(400).json({Error: 'Failed to create User'})
      }
      res.status(200).json({
         message: "User created successfully",
         user: {
            id: userObj._id,
            username: userObj.username,
            email:userObj.email,
            createdAt: userObj.createdAt
         }
      })
      
   } catch (err) {
      const dbErrorMsg = err.errorResponse;
      if (dbErrorMsg.code === 11000) {
         const duplicateKey = Object.keys(dbErrorMsg.keyValue)[0];
         if (duplicateKey === 'username') {
            return res.status(409).json({ Error: 'Username already exists!' , duplicate: duplicateKey})
         }
         if (duplicateKey === 'email') {
            return res.status(409).json({ Error: 'Email already exists!' , duplicate:duplicateKey})
         }
      }
      return res.status(500).json({ Error: 'Internal Server Error!!!' })
   }
}

export const handleUserLogin = async (req, res) => {
   const {identifier, password} = req.body;
   try {
      const usr = await userModel.findOne({
         $or: [{email: identifier}, {username: identifier}]
      })
      if (!usr) {
         return res.status(401).json({Error: 'Invalid email/username or password'})
      }
      if (checkPasswordHash(password, usr.password, usr.salt)) {
         return res.status(200).json({
            message: 'Login successful',
            user: {
               id: usr._id,
               username: usr.username,
               email: usr.email
            }})
      } else {
         return res.status(401).json({Error: 'Invalid email/username or password'})
      }
   } catch (err) {
      console.log('Error in login api\n', err.errorResponse);
   }
}