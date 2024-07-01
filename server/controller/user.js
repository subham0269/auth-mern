import userModel from "../models/users.js";

export const handleUserSignup = async (req, res) => {
   try {
      const { username, email, password } = req.body;
      const userObj = await userModel.create({ username, email, password })
      if (!userObj) {
         res.status(400).json({Error: 'Failed to create User'})
      }
      res.status(200).json({ message: "User created successfully", user: userObj })
   } catch (err) {
      const dbErrorMsg = err.errorResponse;
      if (dbErrorMsg.code === 11000) {
         const duplicateKey = Object.keys(dbErrorMsg.keyValue)[0];
         if (duplicateKey === 'username') {
            return res.status(409).json({ Error: 'Username already exists!' })
         }
         if (duplicateKey === 'email') {
            return res.status(409).json({ Error: 'Email already exists!' })
         }
      }
      return res.status(500).json({ Error: 'Internal Server Error!!!' })
   }
}

export const handleUserLogin = async (req, res) => {
}