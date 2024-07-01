import e from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import mongodbConnect from './connection.js'
import dotenv from 'dotenv';
import userRouter from './routes/auth.js'
dotenv.config()
const app = e();
const PORT = 8002;
const {MONGO_URL} = process.env;

mongodbConnect(MONGO_URL)
   .then(() => console.log('connected to database'))
   .catch(err => console.log('Error in Database\n', err))

app.use(e.urlencoded({extended: false}));

app.use('/auth', userRouter)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))