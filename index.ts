import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import auth from './router/auth';
import userRouter from './router/user-router';
import productRouter from './router/product-router'

const app = express();
dotenv.config({});

console.log(process.env.JWT_KEY);

mongoose.connect(String(process.env.MONGO_DB))
  .then(() => console.log(`App is connected to database`))
  .catch(() => console.log('can\'t connect to db'))
mongoose.set('debug', true);
// app.use(express.bodyParser())
app.use(express.json());

app.use('/user/auth', auth)
app.use('/user', userRouter)
app.use('/product', productRouter)



app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})