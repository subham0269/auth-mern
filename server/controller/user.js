import userModel from "../models/users.js";

export const handleUserSignup = async (req, res) => {
   const { username, email, password } = req.body;
   try {
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
   const {identifier, password} = req.body;
   try {
      const usr = await userModel.findOne({
         $or: [{email: identifier}, {username: identifier}]
      })
      if (!usr) {
         return res.status(401).json({Error: 'Invalid email/username or password'})
      }
      if (usr.password === password) {
         return res.status(200).json({message: 'Login successful', user: {id: usr._id, username: usr.username, email: usr.email}})
      } else {
         return res.status(401).json({Error: 'Invalid email/username or password'})
      }
   } catch (err) {
      console.log('Error in login api\n', err.errorResponse);
   }
}