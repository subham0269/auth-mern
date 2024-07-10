import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()
const { JWT_SECRET } = process.env;

export default function generateAccessToken(userId) {
   const token = jwt.sign({ userId }, JWT_SECRET)
   return token;
}